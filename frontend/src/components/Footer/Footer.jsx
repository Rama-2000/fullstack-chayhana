import { assets } from "../../assets/assets/frontend_assets/assets";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit iusto culpa cum deserunt exercitationem quasi.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivary</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1232435346457</li>
                <li>contact@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 Rasul
      </p>
    </div>
  );
}

export default Footer;
