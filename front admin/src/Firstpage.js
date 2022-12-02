import React from 'react';
import { useNavigate } from "react-router-dom";
import * as IconsRi from "react-icons/ri";
import './Firstpage.css';
function FirstPage() {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate("/signin")
    }

    return (
        <div className='first-container'>
        
            <div className="left">
                <h2 className='title'>
                    EFFREZNi - A good classification for a healthy product.
                </h2>
                <p className='parag'>
                Here we are able to identify products and classify them
                according to their characteristics 
                Thank you for choosing our website.
                I hope you are well served.
                </p>
                <button
                    className="submit"
                    onClick={handleSubmit} >
                    GET STARTED
                </button>
            </div>

            <div className='right'>
                <img src='/Images/model 1-1.jpg' alt='' />
            </div>
        
        </div>
    );
}





export default FirstPage;