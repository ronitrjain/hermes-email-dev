"use client";
import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

const Register = () => {
  const { data: session, status } = useSession()
        const router = useRouter()


  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard")
      return;
    }
  }, [status])


    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [key, setKey] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const emptyInputs = () => {
        setUsername("");
        document.getElementById("username").value = "";
        setEmail("");
        document.getElementById("email").value = "";
        setKey("");
        document.getElementById("corporatekey").value = "";
        setPassword("");
        document.getElementById("password").value = "";
        setPassword2("");
        document.getElementById("password2").value = "";
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        if (
            username.length === 0 ||
            email.length === 0 ||
            key.length === 0 ||
            password.length === 0 ||
            password2.length === 0
        ) {
            setError("Fill all the fields properly.");
            return;
        }
        if (password !== password2) {
            setError("Passwords do not match");
            return;
        }

        setError("");

        const data = {
            username: username,
            email: email,
            key: key,
            password: password
        };
        try {
            let response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),

            });

            if (response.status === 400) {
                setError("Make Sure You Have A Unique Username And Email and the Key is Correct");
                emptyInputs();
                return;
            }

            setSuccess("Success! Redirecting to login page");
            window.location.href = "/login";

            return;



        } catch (e) {
            setError("There was an error");
            emptyInputs();
            return;
        }

    };

    const onChange = (e) => {
        if (e.target.name === "username") {
            setUsername(e.target.value);
        }
        else if (e.target.name === "email") {
            setEmail(e.target.value);
        }
        else if (e.target.name === "corporatekey") {
            setKey(e.target.value);
        }
        else if (e.target.name === "password") {
            setPassword(e.target.value);

        }
        else if (e.target.name === "password2") {
            setPassword2(e.target.value);

        }

        console.log([username, email, key, password, password2])
    }

      return (
    
    <section id="contactus" className="section contactus-section bg-gray" >
      
      <div className="container">
        <SectionTitle
          heading={"Sign Up Now"}
          subHeading={"Register"}
        />
        <div className="row">
          <div className="col-lg-12">
            <div className="contact-form">
              <h6>Make an account</h6>
              <p className="lead">
                Use your corporation key to register.
              </p>
              <form id="contact-form" onSubmit={(e) => onSubmit(e)}>
                <div className="row gx-3 gy-4">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Username</label>
                      <input
                      onChange={(e) => onChange(e)}
                        name="username"
                        id="username"
                        placeholder="Username *"
                        className={`form-control ${
                          error ? (username.length !== 0 ? "" : "invalid") : ""
                        }`}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Your Email</label>
                      <input
                        name="email"
                          onChange={(e) => onChange(e)}

                        id="email"
                        placeholder="Email *"
                        className={`form-control ${
                          error ? (email.length !== 0 ? "" : "invalid") : ""
                        }`}
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label">Corporate Key</label>
                      <input
                        name="corporatekey"
                        id="corporatekey"
                         onChange={(e) => onChange(e)}

                        placeholder="Key *"
                        className={`form-control ${
                          error ? (key.length !== 0 ? "" : "invalid") : ""
                        }`}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-label">Your password</label>
                      <input
                        name="password"
                         onChange={(e) => onChange(e)}

                        
                        type="password"
                        
                        id="password"
                        className={`form-control ${
                          error ? (password.length !== 0 ? "" : "invalid") : ""
                        }`}
                      />
                    </div>
                 
        
                  </div>
                   <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-label">Confirm password</label>
                      <input
                        name="password2"
                         onChange={(e) => onChange(e)}

                        
                        type="password"
                        
                        id="password2"
                        className={`form-control ${
                          error ? (password2.length !== 0 ? "" : "invalid") : ""
                        }`}
                      />
                    </div>
                    <span
                      id="success_message"
                      className="text-success"
                      style={{ display: success ? "block" : "none" }}
                    >
                      {success}
                    </span>
                    <span
                      id="error_message"
                      className="text-danger"
                      style={{ display: error ? "block" : "none" }}
                    >
                      {error}
                    </span>
        
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
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-5 ms-auto col-xl-4 pt-5 pt-lg-0" >
            <ul className="contact-infos">
             
            </ul>
            <div className="text-center pt-5">
              <img src="assets/img/contact.svg" className="svg" alt="image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Register;