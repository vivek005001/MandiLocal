import { Link } from 'react-router-dom';
import { MapPin, Tag } from 'lucide-react';
import './VendorCard.css';

const CATEGORY_COLORS = {
  'Handicrafts': '#7a9e7e',
  'Food & Pickles': '#c0623a',
  'Textiles & Shawls': '#8b6914',
  'Herbs & Spices': '#4a7c59',
  'Wooden Crafts': '#6f4e37',
  'Jewelry': '#d4a843',
  'Art & Paintings': '#5a9468',
  'Other': '#8a7e6c',
};

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

export default function VendorCard({ vendor }) {
  const emoji = CATEGORY_EMOJIS[vendor.category] || '📦';
  const color = CATEGORY_COLORS[vendor.category] || '#8a7e6c';

  return (
    <Link to={`/vendor/${vendor.id}`} className="vendor-card card">
      <div className="vendor-card-header" style={{ background: `linear-gradient(135deg, ${color}18, ${color}08)` }}>
        <span className="vendor-card-emoji">{emoji}</span>
        <span className="badge" style={{ background: `${color}18`, color }}>{vendor.category}</span>
      </div>
      <div className="card-body">
        <h3 className="vendor-card-shop">{vendor.shopName}</h3>
        <p className="vendor-card-name">
          <MapPin size={14} />
          {vendor.name} · Mandi, HP
        </p>
        <p className="vendor-card-desc">{vendor.description}</p>
        <div className="vendor-card-footer">
          <span className="vendor-card-products">
            <Tag size={14} />
            {vendor.products?.length || 0} products
          </span>
          <span className="vendor-card-view">View →</span>
        </div>
      </div>
    </Link>
  );
}
