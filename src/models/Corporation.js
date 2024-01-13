import mongoose from 'mongoose'; // Import mongoose library

const Schema = mongoose.Schema; // Create a Schema




const CorpSchema = new Schema({ // Create a UserSchema
    key:{
        type:String, 
        required: false,
        unique: false
    },
    corporation: {
        type:String, 
        required: false,
        unique: false
    },
    corporation_email: {
        type:String, 
        required: false,
        unique: false
    },
    corporation_password: {
        type:String, 
        required: false,
        unique: false,
        default: ""
    }
    
});


    

let CorpModel = mongoose.models.Corporation|| mongoose.model('Corporation', CorpSchema); // Create a User model
export default CorpModel; // Export the User model
