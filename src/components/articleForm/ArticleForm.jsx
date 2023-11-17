import { useArticleForm } from '../../hooks';

import Input from '../input/Input';

import './ArticleForm.css';

const ArticleForm = ({ articleId, btnText }) => {
    const { article, errors, handleChange, handleSubmit } = useArticleForm(articleId);

    const fields = [
        {
            id: 1,
            name: 'Title',
            inputName: 'title',
            value: article.title,
            type: 'text',
            error: errors.title
        },
        {
            id: 2,
            name: 'Sub-Title',
            inputName: 'subTitle',
            value: article.subTitle,
            type: 'text',
            error: errors.subTitle
        },
        {
            id: 3,
            name: 'Image',
            inputName: 'image',
            value: article.image,
            type: 'text',
            error: errors.image
        },
        {
            id: 4,
            name: 'Text',
            inputName: 'text',
            value: article.text,
            type: 'text',
            error: errors.text
        },
        {
            id: 5,
            name: 'footer',
            inputName: 'footer',
            value: article.footer,
            type: 'text',
            error: errors.footer
        },
    ];

    return (
        <form onSubmit={handleSubmit}>
            {fields.map(field => (
                <Input key={field.id} {...field} handleChange={handleChange} />
            ))}
            <button className="btn update-btn" type="submit">{btnText}</button>
        </form>
    );
};

export default ArticleForm;