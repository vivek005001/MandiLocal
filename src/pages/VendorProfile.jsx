import { useParams, Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, ArrowLeft, Tag, Calendar } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { SEED_VENDORS } from '../data/seedData';
import './VendorProfile.css';

const CATEGORY_EMOJIS = {
  'Handicrafts': '🎨',
  'Food & Pickles': '🫙',
  'Textiles & Shawls': '🧣',
  'Herbs & Spices': '🌿',
  'Wooden Crafts': '🪵',
  'Jewelry': '💎',
  'Art & Paintings': '🖼️',
  'Other': '📦',
};

export default function VendorProfile() {
  const { id } = useParams();

  const stored = JSON.parse(localStorage.getItem('vendors') || '[]');
  const allVendors = [...SEED_VENDORS, ...stored];
  const vendor = allVendors.find((v) => v.id === id);

  if (!vendor) {
    return (
      <div className="profile-page">
        <div className="container profile-not-found">
          <h2>Vendor Not Found</h2>
          <p>This vendor profile doesn't exist.</p>
          <Link to="/catalog" className="btn btn-primary">Back to Catalog</Link>
        </div>
      </div>
    );
  }

  const whatsappLink = `https://wa.me/${vendor.whatsapp}?text=${encodeURIComponent(`Hi ${vendor.name}, I found your shop "${vendor.shopName}" on Mera Himachal and I'm interested in your products!`)}`;
  const categoryEmoji = CATEGORY_EMOJIS[vendor.category] || '📦';

  const renderDescription = (text) => {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green-600)', textDecoration: 'underline' }}>
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="profile-page">
      <SEOHead
        title={vendor.shopName}
        description={`${vendor.shopName} by ${vendor.name} — ${vendor.description.substring(0, 140)}`}
        path={`/vendor/${vendor.id}`}
      />
      <div className="container">
        <Link to="/catalog" className="profile-back">
          <ArrowLeft size={16} /> Back to Catalog
        </Link>

        <div className="profile-layout">
          <div className="profile-main">
            <div className="profile-header-card">
              {vendor.image && (
                <div className="profile-shop-banner">
                  <img src={vendor.image} alt={vendor.shopName} className="profile-shop-banner-img" />
                  <div className="profile-shop-banner-overlay" />
                </div>
              )}
              <div className="profile-header-body">
                <span className="badge">{categoryEmoji} {vendor.category}</span>
                <h1 className="profile-shop">{vendor.shopName}</h1>
                <p className="profile-owner">
                  <MapPin size={15} />
                  {vendor.name} · Mandi, Himachal Pradesh
                </p>
                {vendor.createdAt && (
                  <p className="profile-date">
                    <Calendar size={14} />
                    Vendor since {new Date(vendor.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                  </p>
                )}
                <p className="profile-desc">{renderDescription(vendor.description)}</p>
              </div>
            </div>

            {vendor.products && vendor.products.length > 0 && (
              <div className="profile-products">
                <h2>Products</h2>
                <div className="products-list">
                  {vendor.products.map((product, i) => (
                    <div key={i} className="product-item">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="product-item-thumb"
                        />
                      )}
                      <div className="product-item-info">
                        <Tag size={15} className="product-item-icon" />
                        <div>
                          <h4 className="product-item-name">{product.name}</h4>
                          {product.description && (
                            <p className="product-item-desc">{product.description}</p>
                          )}
                        </div>
                      </div>
                      <span className="product-item-price">{product.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="profile-sidebar">
            <div className="profile-contact-card">
              <h3>Contact Vendor</h3>
              <p className="profile-contact-note">
                Reach out directly to discuss products, pricing, and availability.
              </p>
              <a href={`tel:${vendor.phone}`} className="btn btn-primary profile-contact-btn">
                <Phone size={17} />
                Call {vendor.phone}
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary profile-contact-btn profile-whatsapp"
              >
                <MessageCircle size={17} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
