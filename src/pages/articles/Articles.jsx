import { useGlobalArticleContext } from '../../hooks';

import './Articles.css'

const Articles = () => {
    const {
        isLoading,
    } = useGlobalArticleContext();

    if (isLoading) {
        return <div className='loading'>Loading...</div>;
    }
    
    return (
        <section className='none'>
            <h1>All articles</h1>
        </section>
    );
};

export default Articles;