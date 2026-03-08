import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import VendorCard from '../components/VendorCard';
import { SEED_VENDORS, CATEGORIES } from '../data/seedData';
import './Catalog.css';

export default function Catalog() {
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('vendors') || '[]');
    setVendors([...SEED_VENDORS, ...stored]);
  }, []);

  const filtered = vendors.filter((v) => {
    const matchesSearch =
      v.shopName.toLowerCase().includes(search.toLowerCase()) ||
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || v.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="catalog-page">
      <div className="container">
        <div className="catalog-header">
          <h1>Vendor Catalog</h1>
          <p className="section-subtitle">
            Browse authentic local vendors from Mandi and discover unique products
          </p>
        </div>

        <div className="catalog-filters">
          <div className="catalog-search">
            <Search size={18} className="catalog-search-icon" />
            <input
              type="text"
              className="form-input catalog-search-input"
              placeholder="Search vendors, products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="catalog-category">
            <Filter size={16} />
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <p className="catalog-count">{filtered.length} vendor{filtered.length !== 1 ? 's' : ''} found</p>

        {filtered.length > 0 ? (
          <div className="grid grid-3">
            {filtered.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="catalog-empty">
            <p>No vendors match your search.</p>
            <button className="btn btn-secondary" onClick={() => { setSearch(''); setCategory('All'); }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
