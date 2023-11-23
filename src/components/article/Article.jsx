import "./Article.css";

const Article = ({
  handleArticleClick,
  handleArchiveToggle,
  showArchive,
  ...article
}) => {
    
  const trimText = (text) => {
    const trimmedText = text.substring(0, 200);
    return (
      trimmedText.substring(
        0,
        Math.min(trimmedText.length, trimmedText.lastIndexOf(" "))
      ) + " ..."
    );
  };

  return (
    <section className="single-article-container">
      <main onClick={() => handleArticleClick(article)}>
        <img src={article.img} alt="image" />
        <div className="single-article-text">
          <h2>{article.title}</h2>
          <h3>{article.subtitle}</h3>
          <p>{trimText(article.body)}</p>
        </div>
      </main>
      {showArchive && (
        <button
          onClick={() => handleArchiveToggle(article)}
          className={article.isArchive ? "green-background" : "red-background"}
        >
          {article.isArchive ? "UnArchive" : "Archive"}
        </button>
      )}
    </section>
  );
};

export default Article;
