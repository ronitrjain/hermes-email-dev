import mongoose from "mongoose";
import User from "@/src/models/User";


export default async function handler(req, res) {
    await mongoose.connect('mongodb://127.0.0.1:27017/hermes-email')


    const { method } = req;
    if (method === "POST") {
        const { logo, id } = req.body;



        const user = await User.findById(id);
        console.log(user)
        if (!user) {
            return res.status(400).json({ success: false, data: "user not found" });
        }

    
         try {


        user.logo = logo;



            await user.save();
            console.log("user saved")
            return res.status(200).json({ success: true, data: user });
        } catch (err) {
            console.log("this is an error with saving")
            return res.status(400).json({ success: false, data: err });
        }
    } else {
        return res.status(400).json({ success: false, data: "not a post request" });
    }
}