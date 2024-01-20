import SectionTitle from "./SectionTitle";
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'
import { PuffLoader } from "react-spinners";


const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import Message from "./Message";




const EmailEdit = (props) => {
    const [value, setValue] = useState('');
    let id = props.id;
    const { data: session, status } = useSession()
    const [message, setMessage] = useState("");
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (status == "unauthenticated") {
            router.push("/login")
            return;
        }
    }
    )

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/getEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            })

            const json = await res.json()
            if(json.data.content){
                setValue(json.data.content)
            }
        }
        fetchData();
    }
        , [id])
     

        
async function handleInput(input) {
    setValue(input);
    
}
async function InputSend(){
  await InputSave()
  const user_id = session.user.id;
  const email_id = id;
  const res = await fetch('/api/sendEmail', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id, email_id }),

})
if(res.status == 200){
  setMessage("Your email has been sent")
  setActive(true)
  
    return;
}
else{
  setMessage("There was an error sending your email")
  setActive(true)
}
}

async function InputSave(){
  //make save_button text say "loading" while this is happening

    document.getElementById("puffloader").style.display = "block";

  document.getElementById("save_button").innerHTML = "Loading..."
  document.getElementById("save_button").disabled = true;
    const res = await fetch('/api/editEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value, id }),
    })

    let json = await res.json()
    let content = json.content
    setValue(content)
      document.getElementById("puffloader").style.display = "none";


    if(res.status == 200){
      console.log("saved")
      setMessage("Your draft has been saved")
      setActive(true)
       document.getElementById("save_button").innerHTML = "Save"
  document.getElementById("save_button").disabled = false;

        return;
    }
    else{
      setMessage("There was an error saving your draft")
      setActive(true)
       document.getElementById("save_button").innerHTML = "Save"
  document.getElementById("save_button").disabled = false;
  return ;
    }

    


    


}


  const router = useRouter()

    useEffect(() => {

    if (status == "unauthenticated") {
      router.push("/login")
      return;


    }

 
}, [status, value])    

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block', 'image'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

const override = {
  "display": "none",
  "position": "absolute",
  "top": "0",
  "left": "0",
  "right": "0",
  "bottom": "0",
  "margin": "auto",
  "borderColor": "red",
};



 return (
  <section id="skill" className="section experience-section">
      <Message message={message} active={active} >
                <button onClick={(e)=>setActive(false)} className='px-btn px-btn-theme'>{message}</button>
              </Message>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <SectionTitle heading="Edit Your Draft" subHeading="Newsletter" text=""  />
        </div>
      </div>

      <div className="row">
        <ReactQuill className="my-4" theme="snow" value={value} onChange={handleInput} modules={{toolbar: toolbarOptions}}   />;
        </div>

                        <PuffLoader id="puffloader" cssOverride={override} color="#36d7b7" />


        

            <button id="save_button" onClick={InputSave} className="mt-4 form-control btn-lg px-btn px-btn-theme2"> Save </button>
            <button onClick={InputSend} className=" my-4 form-control btn-lg px-btn px-btn-theme"> Send </button>

        



      
      </div>
      
  </section>
);
}
export default EmailEdit;
