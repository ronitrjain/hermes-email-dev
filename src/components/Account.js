import SectionTitle from "./SectionTitle";
import { use, useEffect, useState } from "react";

import {  signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from 'next/navigation'

import { signIn } from "next-auth/react";

const Account = () => {
    


  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [org_email, setOrgEmail] = useState("");
    const [org_password, setOrgPassword] = useState("");

      const { update } = useSession();


    

  const { data: session, status } = useSession()

   







    const onChange = (e) => {
        if (e.target.name === "username") {
            setUsername(e.target.value);
        } else if (e.target.name === "email") {
            setEmail(e.target.value);
        }
    }
    const onSubmitAuth = async (e) => {

        e.preventDefault();
    }

    const router = useRouter()
    useEffect(() => {

    if (status == "unauthenticated") {
      router.push("/login")
      return;
    }

    if (session) {
        setUsername(session.user.username);
        setEmail(session.user.email);
        setOrgEmail(session.user.organization_email);
        setOrgPassword(session.user.corporation_password);
        document.getElementById("email").value = session.user.email;
        document.getElementById("username").value = session.user.username;
        document.getElementById("key").value = session.user.key;
        document.getElementById("organization").value = session.user.organization;
        document.getElementById("organization_email").value = session.user.organization_email;
        document.getElementById("organization_email_2").value = session.user.organization_email;
        document.getElementById("corporation_password").value = session.user.corporation_password;

    }
    

   
    }, [status])


    


const onSubmitInfo = async (e) => {
        e.preventDefault();
        if (
            username.length === 0 ||
            email.length === 0 
        ) {
            setError("Fill all the fields properly.");
            return;
        }
        setError("");


        const res = await fetch("/api/updateUser", {
            body: JSON.stringify({
                username: username,
                email: email,
                id : session.user.id,
  
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });

        let session_user = session.user;
        session_user.username = username;
        session_user.email = email;

        


        await update(session_user,  false);


        const result = await res.json();

        if (result.error) {
            setError(result.error);
        } else {
         
      
       }
            setSuccess(true);
            //wait 3 seconds
            setTimeout(() => {
              signOut();
            }
            , 2000);



           
        }
    



  return (
    <section id="skill" className="section experience-section">
      <div className="container">
        <div className="row">

          <div className="col-lg-6">
                      <h3 className="mb-4 mt-4">User Information</h3>

            <div className="row"></div>

            

            <div className="form-group">
              <form onSubmit={onSubmitInfo}>

            <label className="form-label mt-3">Username</label>
            <input onChange={e=> onChange(e)} id="username" name="username"className="form-control mb-3" type="text" placeholder="username"></input>
                        
            <label className="form-label">Email</label>
            <input onChange={e=> onChange(e)} id="email" name="email"className="form-control mb-3" type="email" placeholder="email"></input>

            <label className="form-label">Key</label>
            <input disabled id="key" name="key" className="form-control mb-3" type="key" placeholder="key"></input>

            <label className="form-label">Organization</label>
            <input disabled id="organization" name="organization" className="form-control mb-3" type="organization" placeholder="organization"></input>

            <label className="form-label">Organization Email</label>
            <input disabled id="organization_email" name="organization_email" className="form-control mb-3" type="organization_email" placeholder="organization email"></input>

             <button
                        className="px-btn px-btn-theme2"
                        type="submit"
                        value="Send"
                      >
                        
                        Update Info
                      </button>

                      <span
                      id="success_message"
                      className="text-success mt-3"
                      style={{ display: success ? "block" : "none" }}
                    >
                      Info Changed Successfully - You Will Be Redirected To Login Page
                    </span>
            </form>
            </div>



            


            

         
          </div>
           <div className="col-lg-6">
            <div className="row">
<h3 className="mb-4 mt-4">Email Authentication</h3>
              <div className="form-group">

            <label className="form-label mt-3">Organization Email</label>
            <input  id="organization_email_2" name="organization_email_2" className="form-control mb-3" type="text" ></input>

             <label className="form-label mt-3">Password</label>
            <input  id="corporation_password" name="corporation_password" className="form-control mb-3" type="corporation_password" ></input>

 <button
                        className="px-btn px-btn-theme2"
                        type="submit"
                        value="Send"
                      >
                        
                        Test Auth
                      </button>
           
            </div>


            </div>
            

         
          </div>
         
        </div>
      </div>
    </section>
  );
};
export default Account;
