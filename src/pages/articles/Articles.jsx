import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useGlobalArticleContext, useGlobalAuthContext } from "../../hooks";
import { Article } from "../../components";
import "./Articles.css";

const Articles = ({ isManage }) => {
  const { articles, allArticles, toggleArchive } = useGlobalArticleContext();
  const { currentUser } = useGlobalAuthContext();
  const [articlesData, setArticlesData] = useState([]);
  const navigate = useNavigate();


  const handleArchiveToggle = useCallback(
    (article) => {
      currentUser && toggleArchive(article);
    },
    [toggleArchive]
  );

  useEffect(() => {
    if (isManage && currentUser) {
      setArticlesData(allArticles);
    } else {
      setArticlesData(articles);
    }
  }, [allArticles, articles]);

  const handleArticleClick = (article) => {
    navigate(`${article.id}`);
  };

  return (
    <div className={isManage ? "manage-articles" : "articles-container"}>
      <header className="articles-header">
        <h2>{isManage ? "Manage Articles" : "Articles"}</h2>
        {isManage && (
          <Link to="/admin/newArticle" className="new-article-link">
            New Article
          </Link>
        )}
      </header>
      <div className="inner-articles-container">
        {articlesData[0] && articlesData.map((article) => (
          <Article
            handleArchiveToggle={handleArchiveToggle}
            handleArticleClick={handleArticleClick}
            showArchive={isManage}
            key={article.id}
            {...article}
          />
        ))}
      </div>
    </div>
  );
};

export default Articles;
