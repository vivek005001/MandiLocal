import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, MapPin } from 'lucide-react';
import './Navbar.css';

const DISTRICTS = [
  { id: 'mandi', name: 'Mandi', available: true },
  { id: 'shimla', name: 'Shimla', available: false },
  { id: 'kullu', name: 'Kullu', available: false },
  { id: 'kangra', name: 'Kangra', available: false },
  { id: 'chamba', name: 'Chamba', available: false },
  { id: 'solan', name: 'Solan', available: false },
  { id: 'bilaspur', name: 'Bilaspur', available: false },
  { id: 'hamirpur', name: 'Hamirpur', available: false },
  { id: 'una', name: 'Una', available: false },
  { id: 'sirmaur', name: 'Sirmaur', available: false },
  { id: 'kinnaur', name: 'Kinnaur', available: false },
  { id: 'lahaul-spiti', name: 'Lahaul & Spiti', available: false },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [districtOpen, setDistrictOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(DISTRICTS[0]);
  const [toast, setToast] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDistrictOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDistrictSelect = (district) => {
    if (district.available) {
      setSelectedDistrict(district);
    } else {
      setToast(`${district.name} — Coming Soon!`);
      setTimeout(() => setToast(null), 2500);
    }
    setDistrictOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/catalog', label: 'Catalog' },
    { to: '/blogs', label: 'Blog' },
    { to: '/tankri', label: 'Tankri' },
    { to: '/about', label: 'About' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-inner">
          <div className="navbar-brand">
            <Link to="/" className="navbar-logo">
              <img
                src="/merahimachal-logo.svg"
                alt="MeraHimachal"
                className="navbar-logo-icon"
              />
              <span className="navbar-logo-text">Mera Himachal</span>
            </Link>

            {/* District Dropdown */}
            <div className="district-selector" ref={dropdownRef}>
              <button
                className="district-trigger"
                onClick={() => setDistrictOpen(!districtOpen)}
                aria-label="Select district"
              >
                <MapPin size={14} />
                <span>{selectedDistrict.name}</span>
                <ChevronDown size={14} className={`district-chevron ${districtOpen ? 'chevron-open' : ''}`} />
              </button>

              {districtOpen && (
                <div className="district-menu">
                  <div className="district-menu-header">Select District</div>
                  {DISTRICTS.map((district) => (
                    <button
                      key={district.id}
                      className={`district-option ${selectedDistrict.id === district.id ? 'district-active' : ''} ${!district.available ? 'district-disabled' : ''}`}
                      onClick={() => handleDistrictSelect(district)}
                    >
                      <span>{district.name}</span>
                      {!district.available && <span className="coming-soon-badge">Soon</span>}
                      {selectedDistrict.id === district.id && <span className="district-check">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={`navbar-links ${isOpen ? 'navbar-links-open' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`navbar-link ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/register" className="btn btn-primary btn-sm navbar-cta">
              Become a Vendor
            </Link>
          </div>

          <button
            className="navbar-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Toast notification */}
      {toast && (
        <div className="toast district-toast">
          <MapPin size={16} />
          {toast}
        </div>
      )}
    </>
  );
}
