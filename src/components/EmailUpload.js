import SectionTitle from "./SectionTitle";
import { Importer, ImporterField } from 'react-csv-importer';
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import 'react-csv-importer/dist/index.css';
import Message from "./Message";



const EmailUpload = () => {

    const [emails, setEmails] = useState([])

    const {update} = useSession()


    




  const { data: session, status } = useSession()
  const [message, setMessage] = useState("");
  const [active, setActive] = useState(false);




  const router = useRouter()

    useEffect(() => {

    if (status == "unauthenticated") {
      router.push("/login")
      return;
    }


    if(session && session.user && session.user.user_emails){
        setEmails(session.user.user_emails)
    }




}, [status])    

async function dataHandler(rows, { startIndex }) {
  console.log(rows)

  if(rows.length <2){
    return;
  }

    let response = await fetch("/api/setEmails", {
        method: "POST",
        body: JSON.stringify({emails:rows, id: session.user.id}),
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(response.status == 200){
        setEmails(rows)
        session.user.user_emails = rows;
        update(session.user, false)
        setMessage("Emails uploaded successfully");
        setActive(true);
    }
    else{
        setMessage("Error uploading emails");
        setActive(true);
    }

  }



    




  return (
    <section id="skill" className="section experience-section">
       <Message message={message} active={active} >
                <button onClick={(e)=>setActive(false)} className='px-btn px-btn-theme'>{message}</button>
              </Message>
      <div className="container">
        <div className="row">

        <SectionTitle heading="Upload Emails" subHeading="EMAILS" text="Upload a csv with all of your customer emails"  />

            <Importer
  dataHandler={dataHandler}
  defaultNoHeader={false} // optional, keeps "data has headers" checkbox off by default
  restartable={false} // optional, lets user choose to upload another file when import is complete
 
 

>
  <ImporterField name="email" label="Email" />
</Importer>;

<h3>Uploaded Emails</h3>


{emails.map((email) => (
    <p>{email.email}</p>
))}

    

       
      
         
        </div>

     
      </div>
    </section>
  );
};
export default EmailUpload;
