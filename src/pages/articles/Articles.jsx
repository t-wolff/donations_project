import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGlobalArticleContext } from '../../hooks';
import './Articles.css';

const Articles = () => {
	const { articles, fetchAllArticles} = useGlobalArticleContext();
  const [articlesData, setArticlesData] = useState([]);
  const location = useLocation();

	useEffect(() => {
		if (articles[0]) {
      setArticlesData(articles)
    };
	}, [articles]);
  
  return (
    <div className="articles-container">
      <header className="articles-header">
        <h1>Articles</h1>
      </header>
    <div className='articles-container'>
      {articlesData.map((article) => (
        <div className="single-article-container" key={article.id}>
          <h2>{article.title}</h2>
          <h3>{article.subtitle}</h3>
          <img src={article.img} alt="image" />
          <div>{article.text}</div>
          </div>
      ))}
    </div>
    </div>
  );
};

export default Articles;
