import React, { useState } from 'react';
import "./Subscribe.scss";

const Subscribe = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const [subscribeStatus, setSubscribeStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5050/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, consent }),
            });
            if (response.ok) {
                setSubscribeStatus('Thank you for subscribing!');
                setName('');
                setEmail('');
                setConsent(false);
            } else {
                setSubscribeStatus('Subscription failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setSubscribeStatus('An error occurred. Please try again later.');
        }
        setTimeout(() => setSubscribeStatus(''), 3000);
    };

    return (
        <div className="sidebar__subscribe">
            <h3 className="sidebar__subscribe-title">
                Let The Blog Come to You!
            </h3>
            <form onSubmit={handleSubmit} className="sidebar__subscribe-form">
                <div className="sidebar__subscribe-input-container">
                    <input
                        className="sidebar__subscribe-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                    <input
                        className="sidebar__subscribe-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <label className="sidebar__subscribe-text">
                    <input
                        className="sidebar__subscribe-checkbox"
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                    />
                    <span className="sidebar__subscribe-consent-text">
                        I consent to receive emails and understand I can unsubscribe at any time.
                    </span>
                </label>
                <button className="sidebar__subscribe-btn" type="submit">
                    Subscribe
                </button>
            </form>
            {subscribeStatus && <p>{subscribeStatus}</p>}
        </div>
    );
};

export default Subscribe;
