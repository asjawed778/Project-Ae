import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';
import pageNotFoundImage from '../assets/notFoundError.jpg';

function PageNotFound() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div className="page-not-found">
            <img
                src={pageNotFoundImage}
                alt="Page Not Found"
                className="not-found-image"
            />
            <h1 id='page-not-found'>Oops! This page got lost...</h1>
            <p id='page-not-found-desc'>We couldn’t find the page you’re looking for.</p>
            <button className="home-button" onClick={goToHome}>Go to Home</button>
        </div>
    );
}

export default PageNotFound;
