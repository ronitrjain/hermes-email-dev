import mongoose from "mongoose";
import EmailModel from "@/src/models/Email";

export default async function handler(req, res) {
    const { method } = req;
    if (method === "POST") {
        

        try {
            const { id } = req.body;
            await mongoose.connect(process.env.MONGO_URI)
            const Email = await EmailModel.findById(id);

            if (!Email) {
                return res.status(400).json({ success: false, data: "No Email Found" });
            }

            return res.status(200).json({ success: true, data: Email });


        } catch (err) {
            console.log(err)
            return res.status(400).json({ success: false, data: err });
        }
    } else {
        return res.status(400).json({ success: false, data: "Not a POST Request" });
    }
}



