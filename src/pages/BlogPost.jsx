import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, MessageSquare, Send, AlertTriangle, Trash2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { SEED_BLOGS } from '../data/seedData';
import { filterText, containsProfanity } from '../components/CussFilter';
import './BlogPost.css';

export default function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('blogs') || '[]');
    const allBlogs = [...SEED_BLOGS, ...stored];
    const found = allBlogs.find((b) => b.id === id);
    setBlog(found || null);
  }, [id]);

  const showToast = (msg, isError = false) => {
    setToast({ msg, isError });
    setTimeout(() => setToast(null), 3500);
  };

  const addComment = (e) => {
    e.preventDefault();

    if (containsProfanity(commentText) || containsProfanity(commentAuthor)) {
      showToast('Your comment contains inappropriate language. Please revise.', true);
      return;
    }

    const newComment = {
      id: 'c_' + Date.now(),
      author: filterText(commentAuthor),
      text: filterText(commentText),
      date: new Date().toISOString().split('T')[0],
    };

    const updatedBlog = { ...blog, comments: [...(blog.comments || []), newComment] };

    // Update in localStorage or seed data reference
    const stored = JSON.parse(localStorage.getItem('blogs') || '[]');
    const storedIndex = stored.findIndex((b) => b.id === id);
    if (storedIndex !== -1) {
      stored[storedIndex] = updatedBlog;
      localStorage.setItem('blogs', JSON.stringify(stored));
    } else {
      // It's a seed blog — save comments separately
      const seedComments = JSON.parse(localStorage.getItem('seedBlogComments') || '{}');
      seedComments[id] = [...(seedComments[id] || blog.comments || []), newComment];
      localStorage.setItem('seedBlogComments', JSON.stringify(seedComments));
      updatedBlog.comments = seedComments[id];
    }

    setBlog(updatedBlog);
    setCommentText('');
    setCommentAuthor('');
    showToast('Comment added!');
  };

  const deleteComment = (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    const updatedComments = blog.comments.filter(c => c.id !== commentId);
    const updatedBlog = { ...blog, comments: updatedComments };

    // Update in localStorage
    const stored = JSON.parse(localStorage.getItem('blogs') || '[]');
    const storedIndex = stored.findIndex((b) => b.id === id);
    
    if (storedIndex !== -1) {
      stored[storedIndex] = updatedBlog;
      localStorage.setItem('blogs', JSON.stringify(stored));
    } else {
      // It's a seed blog — remove from seed comments
      const seedComments = JSON.parse(localStorage.getItem('seedBlogComments') || '{}');
      seedComments[id] = updatedComments;
      localStorage.setItem('seedBlogComments', JSON.stringify(seedComments));
    }

    setBlog(updatedBlog);
    showToast('Comment deleted successfully');
  };

  // On load, merge seed blog comments from localStorage
  useEffect(() => {
    if (blog && SEED_BLOGS.find((b) => b.id === id)) {
      const seedComments = JSON.parse(localStorage.getItem('seedBlogComments') || '{}');
      if (seedComments[id]) {
        setBlog((prev) => ({ ...prev, comments: seedComments[id] }));
      }
    }
  }, [blog?.id]);

  if (!blog) {
    return (
      <div className="blogpost-page">
        <div className="container blogpost-not-found">
          <h2>Post Not Found</h2>
          <p>This blog post doesn't exist.</p>
          <Link to="/blogs" className="btn btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  // Simple markdown-ish rendering
  const renderContent = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return <h2 key={i} className="blogpost-h2">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="blogpost-bold">{line.replaceAll('**', '')}</p>;
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="blogpost-para">{line}</p>;
    });
  };

  return (
    <div className="blogpost-page">
      <SEOHead
        title={blog.title}
        description={blog.excerpt || blog.content.substring(0, 160)}
        path={`/blog/${blog.id}`}
        type="article"
      />
      <div className="container">
        <Link to="/blogs" className="blogpost-back">
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <article className="blogpost-article">
          <div className="blogpost-header">
            <span className="badge">{blog.category}</span>
            <h1 className="blogpost-title">{blog.title}</h1>
            <div className="blogpost-meta">
              <span><User size={14} /> {blog.author}</span>
              <span>
                <Calendar size={14} />
                {new Date(blog.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>

          <div className="blogpost-content">
            {renderContent(blog.content)}
          </div>
        </article>

        {/* Comments */}
        <section className="blogpost-comments">
          <h2>
            <MessageSquare size={20} />
            Discussion ({blog.comments?.length || 0})
          </h2>

          {blog.comments && blog.comments.length > 0 ? (
            <div className="comments-list">
              {blog.comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-header">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-date">
                      {new Date(comment.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      <button 
                        className="comment-delete-btn" 
                        onClick={() => deleteComment(comment.id)}
                        title="Delete comment"
                        aria-label="Delete comment"
                      >
                        <Trash2 size={13} />
                      </button>
                    </span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="comments-empty">No comments yet. Be the first to join the discussion!</p>
          )}

          <form className="comment-form" onSubmit={addComment}>
            <div className="comment-form-notice">
              <AlertTriangle size={14} />
              Comments are filtered for inappropriate language.
            </div>
            <div className="comment-form-row">
              <input
                className="form-input"
                required
                placeholder="Your name"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
              />
              <div className="comment-input-wrapper">
                <input
                  className="form-input"
                  required
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button type="submit" className="comment-send-btn">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>

      {toast && (
        <div className={`toast ${toast.isError ? 'toast-error' : ''}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
