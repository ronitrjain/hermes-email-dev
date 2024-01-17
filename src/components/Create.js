import SectionTitle from "./SectionTitle";
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'
import { PuffLoader } from "react-spinners";
import {  CSSProperties } from "react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';





const Create = () => {
      const [value, setValue] = useState('');
      const [error, setError] = useState('');

      const [images, setImages] = useState([]);
      const router = useRouter()
      const { data: session, status } = useSession()
        
async function handleInput(input) {
    setValue(input);
    console.log(input)
    
}

async function InputSubmit(){
  if(value == ""){
    setError("Please enter a prompt.")
    return;
  }
  //make create_button text say "loading" while this is happening
  setError("")
  document.getElementById("create_button").innerHTML = "Loading..."
  document.getElementById("create_button").disabled = true;
  document.getElementById("puffloader").style.display = "block";
    let id = session.user.id;
    const res = await fetch('/api/createEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value, id }),
    })
    const json = await res.json()
    let email_id = json.email_id
    if(email_id == undefined || res.status != 200){
      
      document.getElementById("create_button").innerHTML = "Create"
  document.getElementById("create_button").disabled = false;
      setError("There was an error creating your newsletter. Please try again.")
      return;
    }
      

    router.push(`/email/${email_id}`)
     document.getElementById("create_button").innerHTML = "Create"
  document.getElementById("create_button").disabled = false;

  

    


}



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
    <div className="container">
      <div className="row">
        <div className="col-12">
          <SectionTitle heading="Create Your Newsletter" subHeading="Newsletter" text="Prompt our AI with details about your business and what kind of things you want your newsletter to be about."  />
        </div>
      </div>
      

      <div className="row">
        <textarea className="form-control my-3" value={value} onChange={(e) => handleInput(e.target.value)} rows="10" cols="50" placeholder="Write your newsletter prompt."></textarea>
        </div>


                <PuffLoader id="puffloader" cssOverride={override} color="#36d7b7" />


              <button id="create_button" onClick={InputSubmit} className="form-control btn-lg px-btn px-btn-theme2"> Create </button>

              <p className="text-danger my-3">{error}</p>


      
      </div>
      
  </section>
);
}
export default Create;
