import React from 'react';
import AboutImg from '../../assets/images/about-me.jpg';
import './AboutMe.scss';

const AboutMe = () => {
    return (
        <div className="sidebar__section">
            <h3>About:</h3>
            <img src={AboutImg} alt="About Me Image" className="about-me__image" />
            <p className="sidebar__about-text">
                With a passion for creative outlets—whether that's playing piano, ukulele, belting impromptu lyrics from the heart, or dancing like T. Swift (no shade, girl!)—being with animals, getting lost in nature with an instrumental soundtrack playing in the pods to set the mood, meal prepping, lifting, learning about skincare, or slowly developing my blog—thanks Wix for the inspo! This is another creative idea I only wish I'd started sooner—many stories await! I'm a 34-year-old, blonde-haired, blue-eyed, size 4, single, kidless, manless, obsessed dog momma, wandering wildberry going where the wind takes me. From vegetable to victor... sort of. Join me for the next 77 years ahead! And yes, I plan on living until 111 🪄
            </p>
        </div>
    );
};

export default AboutMe;