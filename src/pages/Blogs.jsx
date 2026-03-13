import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PenLine, Search } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { SEED_BLOGS } from '../data/seedData';
import { filterText, containsProfanity } from '../components/CussFilter';
import './Blogs.css';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    title: '',
    author: '',
    category: 'Culture',
    content: '',
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('blogs') || '[]');
    const deletedSeedIds = JSON.parse(localStorage.getItem('deletedSeedBlogs') || '[]');
    
    // Filter out seed blogs that were deleted
    const activeSeedBlogs = SEED_BLOGS.filter(b => !deletedSeedIds.includes(b.id));
    
    setBlogs([...activeSeedBlogs, ...stored]);
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    // Check if it's a seed blog
    if (id.toString().startsWith('b_seed_')) {
      const deletedSeedIds = JSON.parse(localStorage.getItem('deletedSeedBlogs') || '[]');
      if (!deletedSeedIds.includes(id)) {
        deletedSeedIds.push(id);
        localStorage.setItem('deletedSeedBlogs', JSON.stringify(deletedSeedIds));
      }
    } else {
      // It's a user-added blog
      const stored = JSON.parse(localStorage.getItem('blogs') || '[]');
      const updatedStored = stored.filter(b => b.id !== id);
      localStorage.setItem('blogs', JSON.stringify(updatedStored));
    }
    
    // Update local state
    setBlogs(prev => prev.filter(b => b.id !== id));
    showToast('Blog post deleted successfully');
  };

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  const showToast = (msg, isError = false) => {
    setToast({ msg, isError });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for profanity
    if (containsProfanity(form.title) || containsProfanity(form.content)) {
      showToast('Your post contains inappropriate language. Please revise.', true);
      return;
    }

    const newBlog = {
      id: 'b_' + Date.now(),
      title: filterText(form.title),
      author: filterText(form.author),
      category: form.category,
      date: new Date().toISOString().split('T')[0],
      excerpt: filterText(form.content.substring(0, 150)) + '...',
      content: filterText(form.content),
      comments: [],
    };

    const stored = JSON.parse(localStorage.getItem('blogs') || '[]');
    stored.unshift(newBlog);
    localStorage.setItem('blogs', JSON.stringify(stored));

    // Calculate what the active seed blogs are at this point, if we want to redraw properly
    const deletedSeedIds = JSON.parse(localStorage.getItem('deletedSeedBlogs') || '[]');
    const activeSeedBlogs = SEED_BLOGS.filter(cb => !deletedSeedIds.includes(cb.id));

    setBlogs([...activeSeedBlogs, ...stored]);
    setForm({ title: '', author: '', category: 'Culture', content: '' });
    setShowForm(false);
    showToast('Blog post published successfully!');
  };

  return (
    <div className="blogs-page">
      <div className="container">
        <div className="blogs-header">
          <div>
            <h1>Blog & News</h1>
            <p className="section-subtitle">
              Stories, culture, and conversations from Mandi
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            <PenLine size={16} />
            {showForm ? 'Cancel' : 'Write a Post'}
          </button>
        </div>

        {showForm && (
          <form className="blog-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input
                  className="form-input"
                  required
                  placeholder="Your blog post title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input
                  className="form-input"
                  required
                  placeholder="Author name"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option>Culture</option>
                <option>Food</option>
                <option>Heritage</option>
                <option>Artisans</option>
                <option>News</option>
                <option>Discussion</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Content *</label>
              <textarea
                className="form-textarea blog-content-textarea"
                required
                placeholder="Write your blog post here... (Use ## for headings, **bold** for emphasis)"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Publish Post
            </button>
          </form>
        )}

        <div className="blogs-search">
          <Search size={18} className="blogs-search-icon" />
          <input
            type="text"
            className="form-input blogs-search-input"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-3">
            {filtered.map((blog) => (
              <BlogCard key={blog.id} blog={blog} onDelete={(e) => handleDelete(e, blog.id)} />
            ))}
          </div>
        ) : (
          <div className="blogs-empty">
            <p>No posts found.</p>
          </div>
        )}
      </div>

      {toast && (
        <div className={`toast ${toast.isError ? 'toast-error' : ''}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
