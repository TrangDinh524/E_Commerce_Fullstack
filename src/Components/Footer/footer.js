import "./footer.css";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="categories align-items-center justify-content-between">
            <div className="col">
              <h5>FRUIT AND VEGETABLES</h5>
              <ul>
                <li>
                  <Link to="#">Fruits</Link>
                </li>
                <li>
                  <Link to="#">Vegetables</Link>
                </li>
                <li>
                  <Link to="#">Fresh Herbs</Link>
                </li>
                <li>
                  <Link to="#">Fruits</Link>
                </li>
                <li>
                  <Link to="#">Vegetables</Link>
                </li>
                <li>
                  <Link to="#">Fresh Herbs</Link>
                </li>
              </ul>
            </div>
            <div className="col">
              <h5>FRUIT AND VEGETABLES</h5>
              <ul>
                <li>
                  <Link to="#">Fruits</Link>
                </li>
                <li>
                  <Link to="#">Vegetables</Link>
                </li>
                <li>
                  <Link to="#">Fresh Herbs</Link>
                </li>
                <li>
                  <Link to="#">Fruits</Link>
                </li>
                <li>
                  <Link to="#">Vegetables</Link>
                </li>
                <li>
                  <Link to="#">Fresh Herbs</Link>
                </li>
              </ul>
            </div>
            <div className="col">
              <h5>FRUIT AND VEGETABLES</h5>
              <ul>
                <li>
                  <Link to="#">Fruits</Link>
                </li>
                <li>
                  <Link to="#">Vegetables</Link>
                </li>
                <li>
                  <Link to="#">Fresh Herbs</Link>
                </li>
                <li>
                  <Link to="#">Fruits</Link>
                </li>
                <li>
                  <Link to="#">Vegetables</Link>
                </li>
                <li>
                  <Link to="#">Fresh Herbs</Link>
                </li>
              </ul>
            </div>
            <div className="col">
              <h5>FRUIT AND VEGETABLES</h5>
              <ul>
                <li>
                  <Link to="#">Fruits</Link>
                </li>
                <li>
                  <Link to="#">Vegetables</Link>
                </li>
                <li>
                  <Link to="#">Fresh Herbs</Link>
                </li>
                <li>
                  <Link to="#">Fruits</Link>
                </li>
                <li>
                  <Link to="#">Vegetables</Link>
                </li>
                <li>
                  <Link to="#">Fresh Herbs</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="info d-flex align-items-center justify-content-between">
            <p>Copyright © 2025. All rights reserved.</p>
            <div className="social-media d-flex align-items-center">
              <a
                href="https://www.facebook.com/TrangDinh0502"
                alt="Facebook"
                className="social-icon"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/trangdinh0405/"
                alt="Instagram"
                className="social-icon"
              >
                <FaInstagram />
              </a>
              <a
                href="https://x.com/?lang=en"
                alt="Twitter"
                className="social-icon"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com/in/trang-dinh-quynh/"
                alt="LinkedIn"
                className="social-icon"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
