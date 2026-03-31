import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Upload } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { CATEGORIES } from '../data/seedData';
import './VendorRegister.css';

export default function VendorRegister() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    shopName: '',
    phone: '',
    whatsapp: '',
    category: '',
    description: '',
    products: [{ name: '', price: '', description: '' }],
  });

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const updateProduct = (index, field, value) => {
    setForm((prev) => {
      const products = [...prev.products];
      products[index] = { ...products[index], [field]: value };
      return { ...prev, products };
    });
  };

  const addProduct = () => {
    setForm((prev) => ({
      ...prev,
      products: [...prev.products, { name: '', price: '', description: '' }],
    }));
  };

  const removeProduct = (index) => {
    if (form.products.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const vendor = {
      id: 'v_' + Date.now(),
      ...form,
      whatsapp: form.whatsapp || form.phone.replace(/[^0-9]/g, ''),
      image: '',
      createdAt: new Date().toISOString(),
    };

    const stored = JSON.parse(localStorage.getItem('vendors') || '[]');
    stored.push(vendor);
    localStorage.setItem('vendors', JSON.stringify(stored));

    setSubmitted(true);
    setTimeout(() => navigate(`/vendor/${vendor.id}`), 2000);
  };

  if (submitted) {
    return (
      <div className="register-page">
        <div className="container">
          <div className="register-success">
            <CheckCircle size={56} className="register-success-icon" />
            <h2>You're Registered!</h2>
            <p>Your vendor profile has been created. Redirecting you to your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      <SEOHead
        title="Become a Vendor"
        description="Register as a local vendor on Mera Himachal. List your handcrafted products for free and connect directly with customers who value authentic goods."
        path="/register"
      />
      <div className="container">
        <div className="register-wrapper">
          <div className="register-header">
            <h1>Become a Vendor</h1>
            <p className="section-subtitle">
              List your products and reach customers who value authentic, local goods.
              Registration is free and takes just 2 minutes.
            </p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-section">
              <h3>Your Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    className="form-input"
                    required
                    placeholder="e.g. Ramesh Thakur"
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Shop / Business Name *</label>
                  <input
                    className="form-input"
                    required
                    placeholder="e.g. Himalayan Crafts"
                    value={form.shopName}
                    onChange={(e) => updateField('shopName', e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    className="form-input"
                    required
                    type="tel"
                    placeholder="+91 98160 XXXXX"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">WhatsApp Number</label>
                  <input
                    className="form-input"
                    type="tel"
                    placeholder="Same as phone if blank"
                    value={form.whatsapp}
                    onChange={(e) => updateField('whatsapp', e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  className="form-select"
                  required
                  value={form.category}
                  onChange={(e) => updateField('category', e.target.value)}
                >
                  <option value="" disabled>Select a category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">About Your Business *</label>
                <textarea
                  className="form-textarea"
                  required
                  placeholder="Tell buyers about your products, your story, and what makes your goods special..."
                  value={form.description}
                  onChange={(e) => updateField('description', e.target.value)}
                />
              </div>
            </div>

            <div className="register-section">
              <h3>Your Products</h3>
              <p className="register-section-desc">Add the products you want to showcase (you can add more later).</p>
              {form.products.map((product, index) => (
                <div key={index} className="product-entry">
                  <div className="product-entry-header">
                    <span className="product-entry-num">Product {index + 1}</span>
                    {form.products.length > 1 && (
                      <button type="button" className="product-remove" onClick={() => removeProduct(index)}>
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="form-row form-row-3">
                    <div className="form-group">
                      <label className="form-label">Product Name</label>
                      <input
                        className="form-input"
                        placeholder="e.g. Kullu Shawl"
                        value={product.name}
                        onChange={(e) => updateProduct(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Price</label>
                      <input
                        className="form-input"
                        placeholder="e.g. ₹1,200"
                        value={product.price}
                        onChange={(e) => updateProduct(index, 'price', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Short Description</label>
                      <input
                        className="form-input"
                        placeholder="e.g. Handwoven, pure wool"
                        value={product.description}
                        onChange={(e) => updateProduct(index, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn-secondary btn-sm" onClick={addProduct}>
                + Add Another Product
              </button>
            </div>

            <button type="submit" className="btn btn-primary btn-lg register-submit">
              Register as Vendor
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
