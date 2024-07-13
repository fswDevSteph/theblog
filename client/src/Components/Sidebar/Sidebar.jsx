import React from 'react';
import AboutMe from '../AboutMe/AboutMe';
import SocialLinks from '../SocialLinks/SocialLinks';


const Sidebar = () => {
    return (
        <div className="sidebar">
            <AboutMe />
            <SocialLinks />
        </div>
    );
};

export default Sidebar;
