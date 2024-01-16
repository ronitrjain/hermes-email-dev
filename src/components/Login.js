import SectionTitle from "./SectionTitle";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'


const Login = () => {

    const { data: session, status } = useSession()
          const router = useRouter()


    useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard")
      return;
    }
  }, [status])



    const [error, setError] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [hasLoaded, setHasLoaded] = useState(false);



   

 
  
  const onSubmit = async (e) => {
   
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      setError(true);
      return;
    }


   
    
   
    let status =await signIn("credentials", {
        email: email,
        password: password,
        callbackUrl: `/dashboard`,
      redirect:false     } )
    if(status.error){ 
        setError(true);
        return;
    }



      
      }


  const onChange = (e) => {

    if(e.target.name === "email"){
        setEmail(e.target.value)
    }
    if(e.target.name === "password"){
        setPassword(e.target.value)
    }

    console.log(e.target.value)

  }

  useEffect(() => {
    if(!hasLoaded){
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    setHasLoaded(true)
    }
    
  }, []);

 

  return (
    <section id="contactus" className="section contactus-section bg-gray">
      <div className="container">
        <SectionTitle
          heading={"Login"}
          subHeading={"login"}
        />
        <div className="row">
            
          <div className="col-lg-12">
            <div className="contact-form">
              <h6>Log In</h6>
              
              <p className="lead">
                Use your username and password to login.
              </p>
              <form id="login-form" onSubmit={(e) => onSubmit(e)}>
                <div className="row gx-3 gy-4">
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
                    <div className="forgot-password">
                        <p>
                            Forgot password? <a href="/forgot-password">Reset Password</a>
                        </p>
                      </div>
                    <span
                      id="suce_message"
                      className="text-danger"
                      style={{ display: error ? "block" : "none" }}
                    >
                      Wrong email or password
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
                        Sign in
                      </button>
                    </div>
                    <div className="register pt-2">
                        <p>
                            Don't have an account? <a href="/register">Register</a>
                        </p>
                      </div>
                       
                  </div>
                  
                  
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-5 ms-auto col-xl-4 pt-5 pt-lg-0">
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
export default Login;
