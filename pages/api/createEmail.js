 import OpenAI from "openai";
import mongoose, { mongo } from "mongoose";
import EmailModel from "@/src/models/Email";


export default async function handler(req, res) {
    if (req.method === "POST") {

    try{


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});



 let {value:gpt_input, id} = req.body;




let response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    {
      "role": "system",
      "content": "You are an email newsletter writer. Please take the user's input and output a newsletter. Surround the output with html tags."
    },
    {
      "role": "user",
      "content": gpt_input
    }
  ],
  temperature: 1,
  max_tokens: 500,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});



let content= response.choices[0].message.content


     await mongoose.connect(process.env.MONGO_URI)


let email = new EmailModel({
    content: content,
    owner : id,
    sent : false,
    subject: "Newsletter",
    sent_to: [],
    opened: []
})

await email.save()





   
    res.status(200).json({ email_id: email._id.toString()});

} catch (err) {

    console.log("there was an error")
    console.log(err)
    res.status(400).json({ error: err.message });
}

   
}
    }