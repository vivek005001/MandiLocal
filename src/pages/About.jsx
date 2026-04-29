import { Link } from 'react-router-dom';
import { Mountain, MapPin, Landmark, Utensils, Palette, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import './About.css';

const MILESTONES = [
  {
    tag: 'Ground Zero',
    title: 'Surveying Inside the Campus',
    desc: 'Starting off our journey by surveying students, faculty, and local staff inside the campus to understand the gap between local artisans and the community.',
    img: '/images/milestones/campus_survey.jpg',
    alt: 'Surveying with the team inside the campus',
    color: '#3b5998',
  },
  {
    tag: 'Research Partnership',
    title: 'Tankri Language Research',
    desc: 'Collaborated with a dedicated researcher to document and revive the ancient Tankri script — a rare writing system once used across the Mandi-Kullu belt.',
    img: '/images/milestones/tankri_language_research.jpg',
    alt: 'Tankri language research partnership',
    color: '#7a9e7e',
  },
  {
    tag: 'Academic Collaboration',
    title: 'Partnership with IIT Mandi Teams',
    desc: 'Joined forces with interdisciplinary teams at IIT Mandi working on language technology, digital heritage, and cultural preservation in the Himalayan region.',
    img: '/images/milestones/iit_mandi_partnership.jpg',
    alt: 'Team meeting at IIT Mandi campus',
    color: '#8b6914',
  },
  {
    tag: 'Local Business Partnership',
    title: 'Himalayan Dry Fruits, Kullu',
    desc: 'Partnered with Himalayan Dry Fruits Kullu to help local producers reach wider markets while keeping the authentic mountain flavours at the forefront.',
    img: '/images/milestones/himalayan_dry_fruits.jpg',
    alt: 'Meeting at Himalayan Dry Fruits stall in Kullu',
    color: '#c0623a',
  },
  {
    tag: 'Cultural Heritage',
    title: 'With the Family of the King of Kullu',
    desc: 'Had the honour of meeting the royal family of Kullu to discuss the preservation of Himachali culture, traditions, and the role of digital platforms in cultural storytelling.',
    img: '/images/milestones/king_of_kullu.jpg',
    alt: 'Meeting with the family of the King of Kullu at dusk',
    color: '#5a7eb8',
  },
  {
    tag: 'Script Research',
    title: 'Exploring Mandiyali & Tankri Lipi',
    desc: 'Studied rare manuscripts and books on Mandiyali language and Tankri Lipi to understand the linguistic roots of our region — forming the foundation of our digital archive.',
    images: [
      { src: '/images/milestones/mandiyali_books.jpg', alt: 'Book on Pandulipi Vigyan' },
      { src: '/images/milestones/mandiyali_book_1.jpg', alt: 'Balkathaein book' },
      { src: '/images/milestones/mandiyali_book_2.jpg', alt: 'Pahadi-Hindi Shabdkosh preface' },
      { src: '/images/milestones/mandiyali_book_3.jpg', alt: 'Pahadi-Hindi Shabdkosh cover' }
    ],
    color: '#4a7c59',
  },
];

export default function About() {
  return (
    <div className="about-page">
      <SEOHead
        title="About Mandi"
        description="Learn about Mandi, the Choti Kashi of Himachal Pradesh. Discover its ancient temples, vibrant culture, traditional cuisine, and local craftsmanship."
        path="/about"
      />
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

        {/* Our Journey Section */}
        <div className="journey-section">
          <div className="journey-header">
            <div className="about-badge">
              <Mountain size={15} />
              On the Ground
            </div>
            <h2>Our Journey</h2>
            <p className="journey-lead">
              Building Mera Himachal has taken us across mountains, libraries, and living rooms.
              Here are some of the partnerships and moments that shaped this project.
            </p>
          </div>

          <div className="journey-timeline">
            {MILESTONES.map((m, i) => (
              <div key={i} className={`journey-item ${i % 2 === 1 ? 'journey-item--reverse' : ''}`}>
                <div className="journey-photo-wrap">
                  {m.images ? (
                    <div className="journey-photo-grid">
                      {m.images.map((image, idx) => (
                        <img key={idx} src={image.src} alt={image.alt} className="journey-photo" />
                      ))}
                      <div className="journey-photo-shine" />
                    </div>
                  ) : (
                    <>
                      <img src={m.img} alt={m.alt} className="journey-photo" />
                      <div className="journey-photo-shine" />
                    </>
                  )}
                </div>
                <div className="journey-connector">
                  <div className="journey-dot" style={{ background: m.color }} />
                  <div className="journey-line" />
                </div>
                <div className="journey-content">
                  <span className="journey-tag" style={{ background: `${m.color}1a`, color: m.color }}>
                    {m.tag}
                  </span>
                  <h3 className="journey-title">{m.title}</h3>
                  <p className="journey-desc">{m.desc}</p>
                </div>
              </div>
            ))}
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
