import mongoose from 'mongoose'; // Import mongoose library

const Schema = mongoose.Schema; // Create a Schema


let serviceValues = [
    "1und1", "AOL", "DebugMail.io", "DynectEmail", "FastMail", "GandiMail", 
    "Gmail", "Godaddy", "GodaddyAsia", "GodaddyEurope", "hot.ee", "Hotmail", 
    "iCloud", "mail.ee", "Mail.ru", "Mailgun", "Mailjet", "Mandrill", "Naver", 
    "Postmark", "QQ", "QQex", "SendCloud", "SendGrid", "SES", "Sparkpost", 
    "Yahoo", "Yandex", "Zoho", ''
];

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
    },
    service: {
        type: String,
        enum: serviceValues,
default: ""    }
    
});


    

let CorpModel = mongoose.models.Corporation|| mongoose.model('Corporation', CorpSchema); // Create a User model
export default CorpModel; // Export the User model
