import mongoose from "mongoose";
import User from "@/src/models/User";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
    await mongoose.connect(process.env.MONGO_URI)
    const { method } = req;
    if (method === "POST") {
        const { email, password, user_id, service } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill all the fields." });
        }

        let user = await User.findById(user_id);

        if (!user) {
            return res.status(400).json({ error: "User not found." });
        }

    

        user.org_email = email;
        user.corporation_password = password;
        user.service = service;

        try{

        await user.save();


        let transporter = nodemailer.createTransport({
            service: service,
            auth: {
                user: user.org_email,
                pass: user.corporation_password
            },
        });

        let mailOptions = {
            from: user.org_email,
            to: user.email,
            subject: "Hermes Email Verification",
            text: `Your Hermes Email has been verified.`
        };

        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                return res.status(400).json({ error: "Error sending email." });
            } else {
                return res.status(200).json({ message: "Email verified." });
            }
        });
    }
    catch(error){
        return res.status(400).json({ error: "Error sending email." });
    }

        

    } else {

        return res.status(400).json({ error: "Wrong request method." });

    }
}







        




        

