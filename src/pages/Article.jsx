import { Link } from 'react-router-dom';

import { useGlobalAuthContext } from "../hooks";
import { useArticle } from '../hooks';


const Article = () => {
    const { user } = useGlobalAuthContext();

    const { article, handleDelete } = useArticle();

    return (
        <main className='single-column-container'>
            <div className='article-container'>
                <h3 className='article-name'>
                    {article.title}
                </h3>
                <h2 className='article-subTitle'>{article.subtitle}</h2>
                <img className='article-img' src={article.image} alt='article-img' />
                <h2 className='article-text'>{`${article.text}$`}</h2>
                <h2 className='article-footer'>{`${article.footer}$`}</h2>
                {/* {user && user.isAdmin && (
                    <>
                        <Link to={`/products/${article.id}/edit`} className="btn">Edit</Link>
                        <button onClick={handleDelete} className="btn">Delete</button>
                    </>
                )
                } */}
            </div>
        </main>

    );


};

export default Article;