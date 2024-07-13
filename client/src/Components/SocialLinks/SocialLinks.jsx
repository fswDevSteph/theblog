import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faPinterest } from '@fortawesome/free-brands-svg-icons';
import './SocialLinks.scss';

const SocialLinks = () => {
    return (
        <div className="sidebar__social">
            <h3>Follow Me</h3>
            <div className="sidebar__social-icons">
                <a href="#" className="sidebar__social-icon">
                    <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#" className="sidebar__social-icon">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#" className="sidebar__social-icon">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#" className="sidebar__social-icon">
                    <FontAwesomeIcon icon={faPinterest} />
                </a>
            </div>
        </div>
    );
};

export default SocialLinks;