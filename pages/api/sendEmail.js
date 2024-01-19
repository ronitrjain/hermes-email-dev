import EmailModel from '@/src/models/Email';
import UserModel from '@/src/models/User';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === "POST") {
        try{
          
    await mongoose.connect(process.env.MONGO_URI);


    let { user_id, email_id, value } = req.body;

    //find user
    const user = await UserModel.findById(user_id);
    const email = await EmailModel.findById(email_id);

    if(!user || !email){
        console.log("user or email not found")
        res.status(400).json({ error: "User or Email not found" });
        return;
    }
    if(user.org_email == "" || user.corporation_password == ""){
      console.log("user not configured")

        res.status(400).json({ error: "User is not configured" });
        return;
    }


    const transporter = nodemailer.createTransport({
        service: user.service,
        auth: {
            user: user.org_email,
            pass: user.corporation_password
        }
    });

    const sent_to = [];

    let html = email.content 
    let num_sent = 0;
    let target = user.user_emails.length;

    for(let email_to_send of user.user_emails){
        let mailOptions = {
            from: user.org_email,
            to: email_to_send.email,
            subject: email.subject,
            html: html
        };
         transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                num_sent++;
            } else {
              email.sent_to.push(email_to_send)
                num_sent++;
            }
        });
    }

    while(num_sent < target){
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    

    email.sent = true;
    //for each item in sent_to, push to email.sent_to
    
    await email.save();
    return res.status(200).json({ success: true });

} catch (err) {

    res.status(400).json({ error: err.message });
}

   
}
    }