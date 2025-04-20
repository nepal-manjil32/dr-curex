import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // For Vite projects
        const apiKey = import.meta.env.VITE_NEWS_API_KEY;

        if (!apiKey) {
          throw new Error('API key is missing');
        }

        // const response = await axios.get(
        //   `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=${apiKey}`
        // );
        
        if (response.data.articles.length === 0) {
          setError('No health news articles found');
        } else {
          setNews(response.data.articles);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching health news:', err.response || err.message || err);
        setError('Failed to fetch health news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, []);

  const filteredNews = news.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle when API returns null values for images
  const getDefaultImage = () => {
    return 'https://via.placeholder.com/300x200?text=No+Image+Available';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="news-container">
      <div className="news-header">
        <h1>Latest Health News</h1>
        <div className="news-controls">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search health news..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading latest health news...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button 
            className="retry-button"
            onClick={() => {
              setLoading(true);
              setError(null);
              fetchNews();
            }}
          >
            Retry
          </button>
        </div>
      ) : filteredNews.length === 0 ? (
        <div className="no-results">
          <p>No health news articles match your search.</p>
        </div>
      ) : (
        <div className="news-grid">
          {filteredNews.map((article, idx) => (
            <div className="news-card" key={idx}>
              <div className="news-image">
                <img 
                  src={article.urlToImage || getDefaultImage()} 
                  alt={article.title}
                  onError={(e) => {e.target.src = getDefaultImage()}}
                />
              </div>
              <div className="news-content">
                <h3 className="news-title">{article.title}</h3>
                <p className="news-source">
                  {article.source?.name || 'Unknown Source'} • {formatDate(article.publishedAt)}
                </p>
                <p className="news-description">{article.description || 'No description available'}</p>
              </div>
              <div className="news-actions">
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="read-more-btn"
                >
                  Read Full Story
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;