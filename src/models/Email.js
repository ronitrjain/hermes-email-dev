import mongoose from 'mongoose'; // Import mongoose library

const Schema = mongoose.Schema; // Create a Schema



const EmailSchema = new Schema({ // Create a EmailSchema
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type:String, 
        required: false,
        unique: false
    },
    sent: {
        type: Boolean,
        default: false
    },
    subject: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    },
    sent_to: [
        {
            type: Object
        }
    ],
    opened: [
        {
            type: Object
        }
    ]
    
});


    

let EmailModel = mongoose.models.Email|| mongoose.model('Email', EmailSchema); // Create a Email model
export default EmailModel; // Export the Email model
