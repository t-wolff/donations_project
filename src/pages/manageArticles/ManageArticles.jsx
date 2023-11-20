import NewArticle from '../newArticle/NewArticle';
import { Link, useLocation } from 'react-router-dom';
import './ManagesArticles.css';
import { useEffect, useState } from 'react';
import { useGlobalArticleContext } from '../../hooks';

const ManageArticles = () => {
	const { articles, fetchAllArticles, toggleArchive} = useGlobalArticleContext();
  const [articlesData, setArticlesData] = useState([]);
  const location = useLocation();

	useEffect(() => {
		if (articles[0]) {
      setArticlesData(articles)
      console.log(articles[0]);
    };
	}, [articles]);

	useEffect(()=>{
    fetchAllArticles()
  }, [location.key, toggleArchive])

  const handleArchiveToggle = ((article)=>{
    toggleArchive(article);
  })
  
  return (
    <div className="manage-articles-container">
      <header className="manage-articles-header">
        <h1>Manage Articles</h1>
        <Link to="/admin/newArticle" className="manage-articles-link">
          New Article
        </Link>
      </header>
    <div className='articles-container'>
      {articlesData.map((article) => (
        <div className="single-article-container" key={article.id}>
          <h2>{article.title}</h2>
          <h3>{article.subtitle}</h3>
          <img src={article.img} alt="image" />
          <div>{article.text}</div>
          <button onClick={() => handleArchiveToggle(article)}>{article.isArchive ? 'UnArchive' : 'Archive'}</button>        
          </div>
      ))}
    </div>
    </div>
  );
};

export default ManageArticles;
