import { Link } from 'react-router-dom';
import { Mountain, MapPin, Landmark, Utensils, Palette, ArrowRight } from 'lucide-react';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-hero">
          <div className="about-badge">
            <Mountain size={15} />
            The Choti Kashi
          </div>
          <h1>About Mandi</h1>
          <p className="about-lead">
            Nestled in the heart of Himachal Pradesh along the banks of the Beas River,
            Mandi is a town where ancient temples, vibrant culture, and warm people come together.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <MapPin size={28} className="about-card-icon" />
            <h3>Location</h3>
            <p>
              Mandi sits at an elevation of 1,044m at the confluence of the Beas and Suketi rivers.
              It's the gateway to the Kullu Valley and a major junction for travelers heading to Manali, Dharamshala, or Shimla.
            </p>
          </div>
          <div className="about-card">
            <Landmark size={28} className="about-card-icon" />
            <h3>Heritage</h3>
            <p>
              With 81+ ancient stone temples, Mandi earned the title "Choti Kashi."
              The annual International Shivaratri Fair draws hundreds of deities
              and thousands of visitors from across India.
            </p>
          </div>
          <div className="about-card">
            <Utensils size={28} className="about-card-icon" />
            <h3>Cuisine</h3>
            <p>
              From <strong>sidu</strong> (steamed stuffed bread) to <strong>chha gosht</strong> (tangy lamb curry),
              Mandi's food is a culinary treasure. Don't miss <strong>babru</strong> and <strong>patande</strong> from local dhabas.
            </p>
          </div>
          <div className="about-card">
            <Palette size={28} className="about-card-icon" />
            <h3>Crafts</h3>
            <p>
              Handwoven shawls, wooden carvings in deodar and walnut, traditional jewelry,
              and Pahari miniature paintings — Mandi's artisans carry forward centuries of skill.
            </p>
          </div>
        </div>

        <div className="about-mission">
          <h2>Our Mission</h2>
          <p>
            <strong>Mera Himachal</strong> was created to give Mandi's local vendors a digital presence.
            Too many amazing artisans, cooks, and craftspeople remain invisible because they don't have
            access to e-commerce platforms or marketing tools.
          </p>
          <p>
            We believe the solution is simple: let vendors list their products for free,
            and let buyers contact them directly. No commissions, no logistics headaches,
            no middlemen — just authentic connections between makers and appreciators.
          </p>
          <div className="about-cta">
            <Link to="/register" className="btn btn-primary btn-lg">
              Join as a Vendor <ArrowRight size={17} />
            </Link>
            <Link to="/catalog" className="btn btn-secondary btn-lg">
              Browse Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
