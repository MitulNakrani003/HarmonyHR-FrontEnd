import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start mt-5">
      <div className="container p-2">
        <div className="row align-items-start">
          <div className="col-lg-6 col-md-12">
            <h5 className="text-uppercase">Harmony HR</h5>
            <p>
              Your integrated solution for human resource management. Streamlining payroll, benefits, and employee data with ease and precision.
            </p>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="https://github.com/MitulNakrani003/HarmonyHR-FrontEnd" target='blank' className="text-dark text-decoration-none">Source Code</a>
              </li>
              <li>
                <a href="#!" className="text-dark text-decoration-none">Terms of Service</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase">Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://www.linkedin.com/in/mitul-nakrani/" target='blank' className="text-dark text-decoration-none">LinkedIn</a>
              </li>
              <li>
                <a href="https://github.com/MitulNakrani003" target='blank' className="text-dark text-decoration-none">Github</a>
              </li>
              
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-1 copyright-bar">
        © 2025 Copyright:&nbsp;
        <a className="text-dark text-decoration-none" href="https://www.linkedin.com/in/mitul-nakrani/" target='blank'>HarmonyHR By Mitul Nakrani</a>
      </div>
    </footer>
  );
}

export default Footer;