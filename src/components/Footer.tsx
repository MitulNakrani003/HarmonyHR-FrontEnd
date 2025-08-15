import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start mt-auto">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Harmony HR</h5>
            <p>
              Your integrated solution for human resource management. Streamlining payroll, benefits, and employee data with ease and precision.
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-dark text-decoration-none">Privacy Policy</a>
              </li>
              <li>
                <a href="#!" className="text-dark text-decoration-none">Terms of Service</a>
              </li>
              <li>
                <a href="#!" className="text-dark text-decoration-none">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!" className="text-dark text-decoration-none">Source Code</a>
              </li>
              <li>
                <a href="#!" className="text-dark text-decoration-none">Github</a>
              </li>
              <li>
                <a href="#!" className="text-dark text-decoration-none">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3 copyright-bar">
        © 2025 Copyright: 
        <a className="text-dark text-decoration-none" href="https://harmonyhr.com/">HarmonyHR By Mitul Nakrani</a>
      </div>
    </footer>
  );
}

export default Footer;