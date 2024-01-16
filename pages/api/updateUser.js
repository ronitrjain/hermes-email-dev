import mongoose from "mongoose";
import User from "@/src/models/User";

export default async function handler(req, res) {
    await mongoose.connect('mongodb://127.0.0.1:27017/hermes-email')
    const { method } = req;
    if (method === "POST") {
        const { username, email, id } = req.body;


        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(400).json({ success: false, data: "user not found" });
        }


        


        user.username = username;
        user.email = email;



        try {
            await user.save();
            return res.status(200).json({ success: true, data: "It was successfully updated." });
        } catch (err) {
            return res.status(400).json({ success: false, data: "There might be an account with this info already. Try other credentials." });
        }
    } else {
        return res.status(400).json({ success: false, data: "not a post request" });
    }
}



