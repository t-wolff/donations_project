import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalArticleContext } from "../../hooks";
import "./Articles.css";

const Articles = () => {
  const { articles } = useGlobalArticleContext();
  const [articlesData, setArticlesData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (articles[0]) {
      setArticlesData(articles);
    }
  }, [articles]);

  const handleArticleClick = (article) => {
    navigate(`${article.id}`);
  };

  return (
    <div className="articles-container">
      <header className="articles-header">
        <h1>Articles</h1>
      </header>
      <div className="articles-container">
        {articlesData.map((article) => (
          <div
            className="single-article-container"
            onClick={() => handleArticleClick(article)}
            key={article.id}
          >
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
