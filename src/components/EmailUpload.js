import SectionTitle from "./SectionTitle";
import { Importer, ImporterField } from 'react-csv-importer';
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import 'react-csv-importer/dist/index.css';
import csvParser from "csv-parser";
import { set } from "mongoose";



const EmailUpload = () => {

    const [emails, setEmails] = useState([])


    




  const { data: session, status } = useSession()

  console.log(session)



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
    setEmails(rows)
    let response = await fetch("/api/setEmails", {
        method: "POST",
        body: JSON.stringify({emails:rows, id: session.user.id}),
        headers: {
            "Content-Type": "application/json"
        }
    })

    console.log(response)

  }



    




  return (
    <section id="skill" className="section experience-section">
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
