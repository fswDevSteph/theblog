import React from 'react';
import Header from '../../Components/Header/Header';
import Nav from '../../Components/Nav/Nav';
import ContactForm from '../../Components/ContactForm/ContactForm';
import Footer from '../../Components/Footer/Footer';

const Contact = () => {
    return (
        <div className='contact__container'>
            <Header />
            <Nav />

            <ContactForm />


            <Footer />
        </div>
    )
}

export default Contact