import { useGlobalArticleContext } from '../../hooks';

import { AboutBanner, Banner, InstituteBanner } from '../../components';
import './Home.css'

const Home = () => {
    const {
        isLoading,
    } = useGlobalArticleContext();

    if (isLoading) {
        return <div className='loading'>Loading...</div>;
    }
    
    return (
        <section className='home-container'>
           <Banner/>
           <InstituteBanner/>
            <AboutBanner/>
        </section>
    );
};

export default Home;