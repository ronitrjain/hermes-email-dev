import mongoose from 'mongoose';
import CorpModel from '@/src/models/Corporation';

async function createCorporation(key, corporation, corporation_email) {
    try {
        //connect to database
        await mongoose.connect('mongodb://127.0.0.1:27017/hermes-email',  { useNewUrlParser: true, useUnifiedTopology: true });
        const newCorporation = new CorpModel({
            key: key,
            corporation: corporation,
            corporation_email: corporation_email,
            corporation_password: ""
        });
        await newCorporation.save();
        return newCorporation;
    } catch (error) {
        throw error;
    }
}

export default createCorporation;







  