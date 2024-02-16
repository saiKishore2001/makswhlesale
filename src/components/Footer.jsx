import React from "react";
import logopng from "../assets/images/logopng.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faPinterestP,
  faLinkedin,
  faYoutube,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white">

     
      <div className="md:flex md:justify-evenly lg:items-start md:items-center sm:px-12 px-4 pt-4">
        <div className="main-banner md:flex items-center text-center">
          <img
            src={logopng}
            className="object-cover w-56 mx-auto mb-2 md:mb-0" // Added md:mb-0 to remove margin on medium screens and above
            alt="Logo"
          />
          <div className="md:text-left md:ml-4">
            {" "}
            {/* Added container for text content */}
            <a className="text-yellow-300 text-2xl font-serif lg:text-3xl hover:text-yellow-500 hover:cursor-pointer">
              Mak Arena Group
            </a>
            <p className="text-gray-300 mb-4">Your Success starts here.</p>
          </div>
        </div>
        <hr className="my-2 mx-16"></hr>

        <div className="col-lg-2 col-sm-g pb-4">
          <div className="footer-widget mx-auto ">
            <h3 className=" text-yellow-300 font-serif text-xl md:text-2xl lg:text-3xl mb-2 text-center">
              About Us
            </h3>
            <ul className="list-unstyled footer-links flex flex-wrap flex-col justify-center lg:gap-1 items-center lg:items-start  sm:justify-start lg:flex-col md:flex-col">
              <li className="mr-2 mb-4 sm:mb-0">
                <a
                  className="nav-link text-white"
                  routerlink="TermsandConditions"
                >
                  Terms and conditions
                </a>
              </li>
              <li className="mr-2 mb-4 sm:mb-0">
                <a className="nav-link text-white" routerlink="Privacypolicy">
                  Privacy policy
                </a>
              </li>
              <li className="mr-2 mb-4 sm:mb-0">
                <a
                  className="nav-link text-white"
                  routerlink="cancelandrefund"
                >
                  Cancellation and Refund
                </a>
              </li>
              <li className="mr-2 mb-4 sm:mb-0">
                <a className="nav-link text-white" routerlink="shipanddelivery">
                  Shipping and Delivery
                </a>
              </li>
              <li>
                <a className="nav-link text-white" routerlink="HelpandSupport">
                  Help and support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="my-2 mx-16"></hr>
      <div className="flex justify-center  bg-gray-800">
        <h1>Copyright&#169; 2024 MAK Arena. All Right Reserved</h1>
      </div>
    </footer>
  );
}

export default Footer;
