import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Trash2 } from 'lucide-react';
import './BlogCard.css';

const CATEGORY_COLORS = {
  Culture: '#4a7c59',
  Food: '#c0623a',
  Heritage: '#8b6914',
  Artisans: '#6f4e37',
};

export default function BlogCard({ blog, onDelete }) {
  const color = CATEGORY_COLORS[blog.category] || '#4a7c59';

  return (
    <Link to={`/blog/${blog.id}`} className="blog-card card">
      <div className="blog-card-top" style={{ background: `linear-gradient(135deg, ${color}15, ${color}08)` }}>
        <span className="badge" style={{ background: `${color}18`, color }}>{blog.category}</span>
      </div>
      <div className="card-body">
        <h3 className="blog-card-title">{blog.title}</h3>
        <p className="blog-card-excerpt">{blog.excerpt}</p>
        
        {onDelete && (
          <button 
            className="delete-button-overlay" 
            onClick={onDelete}
            title="Delete post"
            aria-label="Delete post"
          >
            <Trash2 size={16} />
          </button>
        )}
        
        <div className="blog-card-meta">
          <span className="blog-card-author">
            <User size={13} />
            {blog.author}
          </span>
          <span className="blog-card-date">
            <Calendar size={13} />
            {new Date(blog.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <span className="blog-card-read">
          Read more <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
