import SectionTitle from "./SectionTitle";
import {useState} from "react"
const serviceData = [
  {
    id: 1,
    name: "Hey Moksh,",
    imageUrl: "https://ci3.googleusercontent.com/meips/ADKq_NZoNSsoeca5R2ZpTjzU_Hqc43Te1lWRCPqEyKFsR4hpWr-Z3yQ0bj0_as8Qrs6r8tlw7rIh5UsZ-ScBTfj2KplVDdSHoLYw3aVpTfjVokSIbnP3aWd6jCnXkvAv=s0-d-e1-ft#https://news.bundesliga.com/imgproxy/img/2041575200/xavi_wittz_600.jpg", // Update with actual image path
    desc: "Subplots abound when RB Leipzig host Bundesliga leaders Bayer Leverkusen in Matchday 18's headline fixture on Saturday. Can Leipzig get back on track? Will Leverkusen stay unbeaten? Who will win out between respective December Rookie and Player of the Month winners Xavi and Florian Wirtz? You do not want to miss it!"
  },
  // ... other services
];

const DragDrop = () => {
  const [services, setServices] = useState(serviceData);
  const [editServiceId, setEditServiceId] = useState(null);

  const addNewBox = () => {
    const newId = services.length + 1;
    const newService = {
      id: newId,
      name: `New Service ${newId}`,
      imageUrl: "path/to/default/image.jpg", // Provide a default image path
      desc: "Description of new service.",
    };
    setServices([...services, newService]);
  };

  const deleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };
  

  const handleServiceUpdate = (id, field, value) => {
    setServices(services.map(service => {
      if (service.id === id) {
        return { ...service, [field]: value };
      }
      return service;
    }));
  };

  const toggleEditMode = (id) => {
    setEditServiceId(editServiceId === id ? null : id);
  };

  return (
    <section id="services" className="section services-section bg-gray">
      <div className="container">
        <SectionTitle heading={"What We Offer"} subHeading={"Services"} />
        <div className="row gy-4">
          {services.map((service) => (
            <div className="col-12 centered-col" key={service.id}>
              <div className="feature-box-01" style={{ textAlign: 'center', height: '568px', position: 'relative' }}>
              <button 
  onClick={() => deleteService(service.id)}
  style={{
    position: 'absolute',
    top: '10px',
    right: '10px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '20px',
  }}
>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
  </svg>
</button>

                <img 
                  src={service.imageUrl} 
                  alt={service.name} 
                  style={{ 
                    width: '600px', 
                    height: '300px', 
                    objectFit: 'cover',
                    display: 'block',
                    margin: '0 auto'
                  }} 
                  className="image-full"
                />
                <div className="feature-content">
                  <h5
                    contentEditable
                    onBlur={(e) => handleServiceUpdate(service.id, 'name', e.target.innerText)}
                    style={{ paddingTop: '20px' }}
                  >
                    {service.name}
                  </h5>
                  <p
                    contentEditable
                    onBlur={(e) => handleServiceUpdate(service.id, 'desc', e.target.innerText)}
                    style={{ paddingTop: '10px' }}
                  >
                    {service.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            onClick={addNewBox} 
            className="px-btn px-btn-theme"
          >
            Add New Box
          </button>
        </div>
      </div>
    </section>
  );
};


export default DragDrop;
