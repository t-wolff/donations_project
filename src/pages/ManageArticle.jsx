import { useParams } from 'react-router';
import { ArticleForm } from '../components';

const ManageArticle = () => {
    const { articleId } = useParams();

    const details = {
        title: articleId ? 'Edit Article' : 'Add Article',
        btnText: articleId ? 'Update' : 'Add',
    };

    const { title, btnText } = details;

    return (
        <div className="single-column-container">
            <h2>{title}</h2>
            <ArticleForm articleId={articleId} btnText={btnText} />
        </div>
    );
};

export default ManageArticle;