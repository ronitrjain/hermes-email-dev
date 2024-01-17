import mongoose from "mongoose";
import User from "@/src/models/User";

export default async function handler(req, res) {
    await mongoose.connect(process.env.MONGO_URI)
    const { method } = req;
    if (method === "POST") {
        const { emails, id } = req.body;


        const user = await User.findById(id);
        if (!user) {
        console.log("user not found")

            return res.status(400).json({ success: false, data: "user not found" });
        }

        console.log("this is emails" + emails)
        console.log(emails)

        user.user_emails = emails;


        try {
            await user.save();
            return res.status(200).json({ success: true, data: user });
        } catch (err) {
            console.log("there was an error saving")
            return res.status(400).json({ success: false, data: err });
        }
    } else {
        return res.status(400).json({ success: false, data: "not a post request" });
    }
}



