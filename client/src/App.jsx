import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Blog from '../src/pages/Blog/Blog';
import Contact from '../src/pages/Contact/Contact';
import DisplaySingleBlogPostPage from './Components/DisplaySingleBlogPostPage/DisplaySingleBlogPostPage';



function App() {
  return (
    <div className="container">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/post/:id" element={<DisplaySingleBlogPostPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

    </div>
  );
}

export default App;