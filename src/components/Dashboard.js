import SectionTitle from "./SectionTitle";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'


const Dashboard = () => {

  let [active, setActive] = useState(true)

    const skillsData = [
  { id: 1, name: "Account", icon: "fas fa-cog", endpoint: "/account" },
  { id: 2, name: "Emails", icon: "fas fa-envelope", endpoint: "/emails"},
  { id: 3, name: "Email History", icon: "fas fa-history", endpoint: "/emailhistory" },
  { id: 4, name: "Logos", icon: "fas fa-shapes", endpoint: "/logos"},
  { id: 5, name: "Contact", icon: "fas fa-comments", endpoint: "/contact" },
  { id: 6, name: "Help", icon: "fas fa-info-circle", endpoint: "/help" },
  { id: 7, name: "Edit", icon: "fas fa-envelope", endpoint: "/edit"}
];
    
        const { data: session, status } = useSession()
        const router = useRouter()

    
        useEffect(() => {
    if (status == "unauthenticated") {
      router.push("/login")
      return;
    }
  }, [status])

        const [error, setError] = useState(false);
        const [success, setSuccess] = useState(false);
    
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const signOutHandler = async () => {
            await signOut()
        }

        const anchorStyle = {
              all: "unset"

        }

        const onAnchorClick = (target) => {
            window.location.href = target
        }



        return (

            <section id="work" className="section work-section bg-gray">
            
      <div className="container">
        <SectionTitle heading={"Dashboard"} subHeading={"Your Info"} />

            

                <div className="skill-box py-6">
              <div className="row g-3">
                {skillsData.map((skill) => (
               
                  
                  <div className="col-6 col-md-4 col-lg-6" key={skill.id}
                  onClick={() => onAnchorClick(skill.endpoint)}
                  >
                    
                    <div className="feature-box-02">
                      <div className="icon">
                        <i className={skill.icon} />
                      </div>
                      <h6>{skill.name}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="px-btn px-btn-theme2 my-4" onClick={signOutHandler}>Sign Out</button>

                </div>
                </section>

           

        )
    }

    export default Dashboard
    
