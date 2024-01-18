import aws from 'aws-sdk';
import { dataUriToBuffer } from 'data-uri-to-buffer';
import EmailModel from '@/src/models/Email';
import mongoose from 'mongoose';
import { JSDOM } from 'jsdom';

const aws_secret_key = process.env.AWS_SECRET_ACCESS_KEY;
const aws_access_key = process.env.AWS_ACCESS_KEY_ID;

export default async function handler(req, res) {
    if (req.method === "POST") {

        try{
            console.log("hit end")
        let {value:input, id} = req.body;
        //get all img src from input

        let images = []
        
         let dom = new JSDOM(input);
        let document = dom.window.document;

        
    


        aws.config.update({
    secretAccessKey: aws_secret_key,
    accessKeyId: aws_access_key,
    signatureVersion: 'v4',
    region: 'us-east-1'

});

const s3 = new aws.S3({
    params: {
        Bucket: 'hermes-email-images',
        signatureVersion: 'v4',
        region: 'us-east-1'
    }
});

    await mongoose.connect(process.env.MONGO_URI);
    let email = await EmailModel.findById(id);


document.querySelectorAll('img').forEach(async (img) => {
     if (img.src.startsWith('data:image')) {
            let date = new Date();
            let timestamp = date.getTime() + Math.floor(Math.random()*1000000)
            let image_name = timestamp + '.jpg';
            let parsed = dataUriToBuffer(img.src);
     
            let params = {
                    Bucket: 'hermes-email-images',
                    Key: image_name,
                    Body: Buffer.from(parsed.buffer)
                };
                let response = await s3.upload(params).promise();
                let image_destination = response.Location;
                img.src = image_destination;
                console.log(img.src)
                input = document.documentElement.outerHTML;
                console.log(input.substring(0, 100))
               

    } })



    //3 second timeout to wait for images to upload

    setTimeout(async () => {
        email.content = input;

        await email.save();
        res.status(200).json({ email_id: email._id.toString(), content: input });
    }
    , 3000)


} catch (err) {

    console.log("there was an error")
    console.log(err)
    res.status(400).json({ error: err.message });
}

   
}
    }