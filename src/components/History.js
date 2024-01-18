import SectionTitle from "./SectionTitle";
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";



const Portfolio = () => {
    const { data: session, status } = useSession()
    const [ emails, setEmails ] = useState([])
    const router = useRouter()
    const [logo, setLogo] = useState(null);
    const [companyName, setCompanyName] = useState(null);



     useEffect( () => {

        if (status == "authenticated") {    
            setLogo(session.user.logo)  
            setCompanyName(session.user.organization)
            async function getEmails(id){
                const portfolioData = await fetch('/api/getEmails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id:id }),
            })
            console.log(portfolioData)
            let json = await portfolioData.json()
            console.log(json)
            return json;
            }

            let user_id = session.user.id;


            getEmails(user_id).then(async (data) => {
                setEmails(data.data)
            })

    }
    else if(status == "unauthenticated"){
        router.push("/")
    }
    }
    , [status])

    console.log(emails)
   


   
  return (
    <section id="work" className="section work-section bg-gray">
      <div className="container">
        <SectionTitle heading={"Email History"} subHeading={"Drafts"} />
        <div className="row g-4 lightbox-gallery">
          {emails.map((email) => (
            <div className="col-sm-6 col-lg-4" key={email.id}>
              <div className="portfolio-box">
                <div className="portfolio-img">
                  <a href={"/email/"+email.id} className="gallery-link">
                    <img src={logo} alt="image" />
                  </a>
                </div>
                <div className="portfolio-info">
                  <h6>{email.title}</h6>
                  <span>{new Date(email.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</span>
                  <a href={email.image} className="gallery-link">
                    <i className="fas fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Portfolio;
