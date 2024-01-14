// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose';
import User from '@/src/models/User.js';
import Corporation from '@/src/models/Corporation';
import bcrypt from 'bcryptjs';
export default async function handler(req, res) {
    await mongoose.connect('mongodb://127.0.0.1:27017/hermes-email')

    const { method } = req
    if (method === 'POST') {
        const { username, email, key, password } = req.body
        let hashedPassword = await bcrypt.hash(password, 10)

        let company = await Corporation.findOne({ key: key })
        if (!company) {
            return res.status(400).json({ success: false, data: "company not found" })
        }



        const user = new User({
            username: username,
            email: email,
            key: key,
            password: hashedPassword,
            org_email: company.corporation_email,
            organization: company.corporation,
            corporation_password:"",
            service: ""

        })
        try {
            await user.save()
            return res.status(200).json({ success: true, data: user })
        }
        catch (err) {
            return res.status(400).json({ success: false, data: err })
        }

    } else {
        return res.status(400).json({ success: false, data: "not a post request" })
    }


   

  
}










