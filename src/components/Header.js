import { Accordion } from "react-bootstrap";
import { useSession } from "next-auth/react"

const Header = () => {
    const { data: session, status } = useSession()

  return (
    <header className="main-header">
      <nav className="navbar header-nav navbar-expand-lg one-page-nav">
        <div className="container">
          {/* Brand */}
          <a className="navbar-brand" href="/">
            <span className="header-text">HERMES</span>
          </a>
          {/* / */}
          <Accordion>
            {/* Mobile Toggle */}
            <Accordion.Toggle
              eventKey={"toggle"}
              as={"button"}
              className="navbar-toggler"
            >
              <span />
              <span />
              <span />
            </Accordion.Toggle>
            {/* / */}
            {/* Top Menu */}
            <Accordion.Collapse
              eventKey={"toggle"}
              className="navbar-collapse justify-content-end"
            >
              <ul className="navbar-nav mx-auto">
                <li>
                  <a className="nav-link active" href="/">
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/create">
                    <span>Create</span>
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/how_to_use">
                    <span>How To Use</span>
                  </a>
                </li>
              
                <li>
                  <a className="nav-link" href="/contact">
                    <span>Contact</span>
                  </a>
                </li>
              </ul>
            </Accordion.Collapse>
          </Accordion>
          {/* / */}
          {/* Top Menu */}
          <div className="ms-auto d-none d-lg-block">
            <a className="px-btn px-btn-theme2" href= {status==="authenticated" ? "/dashboard" : "/login"}>
              {status==="authenticated" ? "Dashboard" : "Login"}
            </a>

          </div>
          {/* / */}
        </div>
        {/* Container */}
      </nav>{" "}
      {/* Navbar */}
    </header>
  );
};
export default Header;
