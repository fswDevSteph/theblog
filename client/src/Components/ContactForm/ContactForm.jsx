import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './ContactForm.scss';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        if (statusMessage) {
            const timer = setTimeout(() => {
                setStatusMessage('');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    message: ''
                });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [statusMessage]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_ie1o7hh', 'template_92kqcpa', e.target, 'Cu77DC8fwgO-KKEJ-')
            .then((result) => {
                console.log(result.text);
                setStatusMessage('Message sent successfully!');


                emailjs.send('service_ie1o7hh', 'template_yzdk02f', {
                    firstName: formData.firstName,
                    email: formData.email
                }, 'Cu77DC8fwgO-KKEJ-')
                    .then((autoReplyResult) => {
                        console.log('Auto-reply sent:', autoReplyResult.text);
                    }, (autoReplyError) => {
                        console.error('Auto-reply error:', autoReplyError.text);
                    });

            }, (error) => {
                console.log(error.text);
                setStatusMessage('Failed to send message. Please try again.');
            });

    };

    return (
        <div className="contact-form">
            <h3>So excited to hear from you!</h3>
            <p>Maybe you have feedback. Maybe you have a juicy story to share. Maybe you want to join the community and blog with me!
                <br />
                <b>Don't hesitate. Reach out!</b> </p>
            <form onSubmit={handleSubmit}>
                <div className="contact-form__row">
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                        className="contact-form__input"
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                        className="contact-form__input"
                    />
                </div>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email *"
                    required
                    className="contact-form__input"
                />
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message..."
                    required
                    className="contact-form__textarea"
                />
                <button type="submit" className="contact-form__button">Submit</button>
            </form>
            {statusMessage && <p>{statusMessage}</p>}
        </div>
    );
};

export default ContactForm;
