import React from 'react';
import Header from '../../Components/Header/Header';
import Nav from '../../Components/Nav/Nav';
import Sidebar from '../../Components/Sidebar/Sidebar';
import FeaturePost from '../../Components/FeaturePost/FeaturePost';
import BlogList from '../../Components/BlogList/BlogList';
import ContactForm from '../../Components/ContactForm/ContactForm';
import Footer from '../../Components/Footer/Footer';
import './Home.scss';
import Subscribe from '../../Components/Subscribe/Subscribe';


const Home = () => {
    return (
        <div className="home">
            <Header />
            <Nav />
            <div className="home__main-content">
                <FeaturePost />
                <Subscribe />
                <div className="home__blog-content">
                    <BlogList isPreview={true} limit={5} excludeFeatured={true} />
                    <ContactForm />
                </div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    )
}

export default Home;