import mongoose from 'mongoose'; // Import mongoose library
import bcrypt from 'bcryptjs'; // Import bcrypt library
const Schema = mongoose.Schema; // Create a Schema


//create a match function for the email


const UserSchema = new Schema({ // Create a UserSchema
    username: {
        type:String, 
        required: true,
        unique: true
    },
    password: {
        type:String, 
        required: true,
        unique: false
    },
    key:{
        type:String, 
        required: false,
        unique: false
    },
    email: {
        type:String, 
        required: true,
        unique: false
    },
    org_email: {
        type:String, 
        required: false,
        unique: false
    },
    organization: {
        type:String, 
        required: false,
        unique: false
    },
    user_emails:[
        {
            type:String
        }
    ],
    corporation_password: {
        type:String, 
        required: false,
        unique: false,
        default: ""
    }   
    
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
    }
    

let UserModel = mongoose.models.User|| mongoose.model('User', UserSchema); // Create a User model
export default UserModel; // Export the User model
