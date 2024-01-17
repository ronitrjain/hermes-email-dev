import aws from 'aws-sdk';
import { dataUriToBuffer } from 'data-uri-to-buffer';
import EmailModel from '@/src/models/Email';
import mongoose from 'mongoose';

const aws_secret_key = process.env.AWS_SECRET_ACCESS_KEY;
const aws_access_key = process.env.AWS_ACCESS_KEY_ID;

export default async function handler(req, res) {
    if (req.method === "POST") {

        try{
            console.log("hit end")
        let {value:input, id} = req.body;
        //get all img src from input

        let images = []
        
         images = input.match(/<img[^>]+src="([^">]+)"/g)?.map((img) => {
            return img.match(/src="([^">]+)"/)[1];
        });
        if(images == null || images == undefined){
            images = []
        }



    

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

for (let i = 0; i < images.length; i++) {
let date = new Date();
let timestamp = date.getTime() + i;
let image_name = timestamp + '.jpg';

let parsed = dataUriToBuffer(images[i]);

 let params = {
            Bucket: 'hermes-email-images',
            Key: image_name,
            Body: Buffer.from(parsed.buffer)
        };
        let response = await s3.upload(params).promise();
        let image_destination = response.Location;

        input = input.replace(images[i], image_destination);

        
    }
    mongoose.connect(process.env.MONGO_URI);

    //create new email on mongodb
    //find the email by id
    //update the email content
    //save the email
    //return the id

    let email = await EmailModel.findById(id);
    email.content = input;
    await email.save();
    


    


    res.status(200).json({ email_id: email._id.toString() });

} catch (err) {

    console.log("there was an error")
    res.status(400).json({ error: err.message });
}

   
}
    }