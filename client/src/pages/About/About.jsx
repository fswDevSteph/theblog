import React from 'react';
import Header from '../../Components/Header/Header';
import Nav from '../../Components/Nav/Nav';
import AboutMe from '../../Components/AboutMe/AboutMe';
import Footer from '../../Components/Footer/Footer';

const About = () => {
    return (
        <div className='about__container'>
            <Header />
            <Nav />
            <div className="about__content">
                {/* <h2>Title</h2>
                <p>Some about The Blog text</p>
                <p>maybe some more About The Blog text? Idk</p> */}
            </div>
            <AboutMe />
            <Footer />
        </div>
    )
}

export default About
