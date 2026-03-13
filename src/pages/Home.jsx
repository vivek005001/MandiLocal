import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Newspaper, Users, Mountain } from 'lucide-react';
import VendorCard from '../components/VendorCard';
import BlogCard from '../components/BlogCard';
import { SEED_VENDORS, SEED_BLOGS } from '../data/seedData';
import './Home.css';

export default function Home() {
  const [vendors, setVendors] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('vendors') || '[]');
    const allVendors = [...SEED_VENDORS, ...stored];
    setVendors(allVendors.slice(0, 4));

    const storedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    const allBlogs = [...SEED_BLOGS, ...storedBlogs];
    setBlogs(allBlogs.slice(0, 3));
  }, []);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-badge fade-in-up">
            <Mountain size={15} />
            Mandi, Himachal Pradesh
          </div>
          <h1 className="hero-title fade-in-up fade-in-up-delay-1">
            Discover the Heart<br />of <span className="hero-accent">Mandi</span>
          </h1>
          <p className="hero-subtitle fade-in-up fade-in-up-delay-2">
            Your gateway to authentic local culture, handcrafted goods, and stories
            from the Choti Kashi. Support local artisans and vendors directly.
          </p>
          <div className="hero-actions fade-in-up fade-in-up-delay-3">
            <Link to="/catalog" className="btn btn-primary btn-lg">
              Browse Catalog <ArrowRight size={18} />
            </Link>
            <Link to="/register" className="btn btn-secondary btn-lg">
              Become a Vendor
            </Link>
          </div>

          <div className="hero-stats fade-in-up fade-in-up-delay-4">
            <div className="hero-stat">
              <ShoppingBag size={18} />
              <div>
                <span className="hero-stat-number">{vendors.length}+</span>
                <span className="hero-stat-label">Local Vendors</span>
              </div>
            </div>
            <div className="hero-stat">
              <Newspaper size={18} />
              <div>
                <span className="hero-stat-number">{blogs.length}+</span>
                <span className="hero-stat-label">Stories</span>
              </div>
            </div>
            <div className="hero-stat">
              <Users size={18} />
              <div>
                <span className="hero-stat-number">81+</span>
                <span className="hero-stat-label">Ancient Temples</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-bg-pattern" />
      </section>

      {/* Featured Vendors */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Vendors</h2>
              <p className="section-subtitle">
                Meet the artisans and sellers keeping Mandi's traditions alive
              </p>
            </div>
            <Link to="/catalog" className="btn btn-outline btn-sm">
              View All <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-4">
            {vendors.map((vendor, i) => (
              <div key={vendor.id} className={`fade-in-up fade-in-up-delay-${i + 1}`}>
                <VendorCard vendor={vendor} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Latest Stories</h2>
              <p className="section-subtitle">
                News, culture, and voices from Mandi
              </p>
            </div>
            <Link to="/blogs" className="btn btn-outline btn-sm">
              All Posts <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-3">
            {blogs.map((blog, i) => (
              <div key={blog.id} className={`fade-in-up fade-in-up-delay-${i + 1}`}>
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2>Are you a local vendor?</h2>
              <p>
                Register for free and reach customers who appreciate authentic, locally-made products.
                No fees, no middlemen — just direct connection.
              </p>
              <Link to="/register" className="btn btn-primary btn-lg">
                Register Now — It's Free <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
