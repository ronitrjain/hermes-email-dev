import mongoose from "mongoose";
import EmailModel from "@/src/models/Email";

export default async function handler(req, res) {
    const { method } = req;
    if (method === "POST") {
        

        try {
            const { user_id } = req.body;
            await mongoose.connect(process.env.MONGO_URI)
            const emails = await EmailModel.find({owner: user_id})

            console.log(emails)

            if (!emails) {
                return res.status(400).json({ success: false, data: "No Email Found" });
            }
            let response = []
            emails.forEach(email => {
                response.push({id: email._id, title: email.subject, date: email.date})
            })

            response = response.reverse()


            return res.status(200).json({ success: true, data: response });


        } catch (err) {
            console.log(err)
            return res.status(400).json({ success: false, data: err });
        }
    } else {
        return res.status(400).json({ success: false, data: "Not a POST Request" });
    }
}



