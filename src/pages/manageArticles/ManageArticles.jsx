import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useGlobalArticleContext } from "../../hooks";
import "./ManagesArticles.css";

const ManageArticles = () => {
  const { allArticles, toggleArchive } = useGlobalArticleContext();

  const handleArchiveToggle = useCallback(
    (article) => {
      toggleArchive(article);
    },
    [toggleArchive]
  );

  return (
    <div className="manage-articles-container">
      <header className="manage-articles-header">
        <h2>Manage Articles</h2>
        <Link to="/admin/newArticle" className="manage-articles-link">
          New Article
        </Link>
      </header>
      <div className="articles-container">
        {allArticles.map((article) => (
          <div className="single-article-container" key={article.id}>
            <h2>{article.title}</h2>
            <h3>{article.subtitle}</h3>
            <img src={article.img} alt="image" />
            <div>{article.body}</div>
            <button onClick={() => handleArchiveToggle(article)}>
              {article.isArchive ? "UnArchive" : "Archive"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageArticles;
