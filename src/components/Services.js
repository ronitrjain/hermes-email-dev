import SectionTitle from "./SectionTitle";

const serviceData = [
  {
    id: 1,
    name: "Newsletter AI",
    icon: "bi bi-phone",
    desc: "Let our custom AI generate a newsletter for you based on your company's information.",
  },
  {
    id: 2,
    name: "Manage Your Newsletters",
    icon: "bi bi-laptop",
    desc: "View all of your newsletters in one place, edit them, and send them to your clients.",
  },
  {
    id: 3,
    name: "Manage Your Mail List",
    icon: "bi bi-triangle",
    desc: "Add and remove emails from your mailing list and keep track of who you are sending to.",
  },
  {
    id: 4,
    name: "Automate Sending",
    icon: "bi bi-columns",
    desc: "Send to all of your clients at once, from one place. No more sending emails one by one.",
  },
  {
    id: 5,
    name: "Design Ideas",
    icon: "bi bi-distribute-vertical",
    desc: "Let our AI generate design ideas and take design ideas from our design gallery.",
  },
  {
    id: 6,
    name: "Send to Multiple Platforms",
    icon: "bi bi-globe2",
    desc: "Send to multiple platforms at once, including Mailchimp, Gmail, GoDaddy, and Outlook.",
  },
];
const Services = () => {
  return (
    <section id="services" className="section services-section bg-gray">
      <div className="container">
        <SectionTitle heading={"What We Offer"} subHeading={"Services"} />
        <div className="row gy-4">
          {serviceData.map((service) => (
            <div className="col-sm-6 col-lg-4" key={service.id}>
              <div className="feature-box-01">
                <div className="feature-content">
                  <div className="number">
                    <span>0{service.id}</span>
                  </div>
                  <h5>{service.name}</h5>
                  <p>{service.desc}</p>
                  <div className="icon">
                    <i className={service.icon} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Services;
