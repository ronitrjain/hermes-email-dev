import SectionTitle from "./SectionTitle";
import { Importer, ImporterField } from 'react-csv-importer';
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { set } from "mongoose";





const Logo = () => {


  const { data: session, status } = useSession()
      const [file, setFile] = useState();
            const { update } = useSession();
            const [error, setError] = useState("");
            const [success, setSuccess] = useState("");


       async function handleUpload(e) {
        if(e.target.files.length > 0)
        setFile(URL.createObjectURL(e.target.files[0]));
          const imageData = new FormData();
          imageData.append('logo', e.target.files[0])
          imageData.append('id', session.user.id)

          try{

      let data = await fetch('http://localhost:4000/api/logo_upload', {
        method: 'POST',
        body: imageData
      })
      if(data.status == 200){
      data = await data.json()
      }else{
        setError("There was an error uploading your logo. Please try again.")
      setSuccess("")

        return;
      }

      


      let res = await fetch('/api/logo', {
        method: 'POST',
        body: JSON.stringify({logo: data.image_destination, id: session.user.id}),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(res.status == 200){

      session.user.logo = data.image_destination;

      update(session.user, false);
      setError("")
      setSuccess("Logo successfully uploaded.")
      }
      else{
        setError("There was an error uploading your logo. Please try again.")
        setSuccess("")
        return;
      }

    }
    catch(e){
      setError("There was an error uploading your logo. Please try again.")
      setSuccess("")
      return;
    }
      

    }


  const router = useRouter()

    useEffect(() => {

    if (status == "unauthenticated") {
      router.push("/login")
      return;
    }
    if(session){
      setFile(session.user.logo)
    }
}, [status])    



 return (
  <section id="skill" className="section experience-section">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <SectionTitle heading="Upload Logo" subHeading="Logo" text="Upload your logo as a png to render on your emails"  />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="image_upload" className="h3 my-3">Add Image:</label>
            <input accept="image/*" className="form-control" id="image_upload" type="file" onChange={handleUpload} />
          </div>
        </div>
      </div>

        <div className="col-12">
          <h3 className="mt-4 mb-4">Current Logo</h3>
          <div className="mt-2">
            <img src={file} className="img-fluid" style={{maxWidth: "10%", height: "auto"}} alt="Current Logo" />
          </div>
          <span className="text-danger">{error}</span>
           <span className="text-success">{success}</span>

        </div>
      </div>
  </section>
);
}
export default Logo;
