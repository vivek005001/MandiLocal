import { Link } from 'react-router-dom';
import { Mountain, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <Mountain size={22} />
              <span>Mera Himachal <span className="footer-logo-accent">- Mandi</span></span>
            </Link>
            <p className="footer-desc">
              Connecting you to the authentic culture, crafts, and flavors of Mandi, Himachal Pradesh.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Explore</h4>
            <Link to="/catalog" className="footer-link">Vendor Catalog</Link>
            <Link to="/blogs" className="footer-link">Blog & News</Link>
            <Link to="/about" className="footer-link">About Mandi</Link>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Get Involved</h4>
            <Link to="/register" className="footer-link">Become a Vendor</Link>
            <Link to="/blogs" className="footer-link">Write a Blog Post</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            Made with <Heart size={14} className="footer-heart" /> in Mandi, Himachal Pradesh
          </p>
          <p className="footer-copy">© 2026 Mera Himachal. For the community, by the community.</p>
        </div>
      </div>
    </footer>
  );
}
