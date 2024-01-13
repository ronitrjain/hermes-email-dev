import SectionTitle from "./SectionTitle";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { set } from "mongoose";


const Key = () => {

    const { data: session, status } = useSession()
          const router = useRouter()


    useEffect(() => {
    if (status === "") {
      router.push("/login")
      return;
    }
  }, [status])



    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [email, setEmail] = useState("");
    const [company_key, setKey] = useState("");
    const [company, setCompany] = useState("");

    const [hasLoaded, setHasLoaded] = useState(false);



   

 
  
  const onSubmit = async (e) => {
    


   
    e.preventDefault();
    if (email.length === 0 || company.length === 0 || company_key.length === 0) {
      setError(true);
      return;
    }

    const res = await fetch("/api/key", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, company_key, company }),
    });
    if (res.status === 200) {
      setSuccess(true);
      setError(false);
      setEmail("");
      setKey("");
      setCompany("");

      
      await new Promise((resolve) => setTimeout(resolve, 3000));

      router.push("/dashboard")



      return;
    }
    setError(true);
    setSuccess(false);
    return;
    
    
   
   
      
       }


  const onChange = (e) => {

    if(e.target.name === "email"){
        setEmail(e.target.value)
    }
    if(e.target.name === "key"){
        setKey(e.target.value)
    }
    if(e.target.name === "company"){
        setCompany(e.target.value)
    }


    console.log(e.target.value)

  }

  useEffect(() => {
    if(!hasLoaded){
    document.getElementById("key").value = "";
    document.getElementById("email").value = "";
    document.getElementById("company").value = "";

    setHasLoaded(true)
    }
    
  }, []);

 

  return (
    <section id="contactus" className="section contactus-section bg-gray">
      <div className="container">
        <SectionTitle
          heading={"Key Registration"}
          subHeading={"Create "}
        />
        <div className="row">
            
          <div className="col-lg-12">
            <div className="contact-form">
              <h6>Key information</h6>
              
              <p className="lead">
                Provide a key, company name and email address to send emails with.
              </p>
              <form id="login-form" onSubmit={(e) => onSubmit(e)}>
                <div className="row gx-3 gy-4">
                     <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-label">Register Key</label>
                      <input
                        name="key"
                        onChange={(e) => onChange(e)}

                        type="text"
                        placeholder="Key *"
                        
                        id="key"
                        className={`form-control ${
                          error ? (company_key.length !== 0 ? "" : "invalid") : ""
                        }`}
                      />
                    </div>
                    
                   
                  </div>

                   <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-label">Register Company</label>
                      <input
                        name="company"
                        onChange={(e) => onChange(e)}

                        type="text"
                        placeholder="Company *"
                        
                        id="company"
                        className={`form-control ${
                          error ? (company.length !== 0 ? "" : "invalid") : ""
                        }`}
                      />
                    </div>
                    
                    
                  </div>
                  


                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        name="email"
                        id="email"
                        placeholder="Email *"
                        className={`form-control ${
                          error ? (email.length !== 0 ? "" : "invalid") : ""
                        }`}
                        onChange={(e) => onChange(e)}
                        type="email"
                      />
                    </div>
                  </div>
                 
                 
                 
                  <div className="col-md-12">
                    <div className="send">
                      <button
                        className="px-btn px-btn-theme2"
                        type="submit"
                        value="Send"
                        
                      >
                        {" "}
                        Register
                      </button>
                    </div>

                    {error && (
                      <div className="text-danger">
                        Please fill out all fields.
                      </div>
                    )}
                    {success && (
                      <div className="text-success">
                        Successfully registered key.
                      </div>
                    )}
                    
                       
                  </div>
                  
                  
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-5 ms-auto col-xl-4 pt-5 pt-lg-0">
            <ul className="contact-infos">
             
            </ul>
            <div className="text-center pt-5">
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Key;
