import SectionTitle from "./SectionTitle";
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';





const EmailEdit = (props) => {
    const [value, setValue] = useState('');
    let id = props.id;
    const { data: session, status } = useSession()

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
async function InputSend(){}

async function InputSave(){
    let id = session.user.id;
    const res = await fetch('/api/createEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value, id }),
    })

    const json = await res.json()
    


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



 return (
  <section id="skill" className="section experience-section">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <SectionTitle heading="Edit Your Draft" subHeading="Newsletter" text=""  />
        </div>
      </div>

      <div className="row">
        <ReactQuill className="my-4" theme="snow" value={value} onChange={handleInput} modules={{toolbar: toolbarOptions}}   />;
        </div>

        

            <button onClick={InputSave} className="mt-4 form-control btn-lg px-btn px-btn-theme2"> Save </button>
            <button onClick={InputSend} className=" my-4 form-control btn-lg px-btn px-btn-theme"> Send </button>



      
      </div>
      
  </section>
);
}
export default EmailEdit;
