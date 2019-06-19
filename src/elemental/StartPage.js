import React from 'react';
import { Link } from 'react-router-dom';
import './StartPage.css';

const StartPage = () => {
    return (
        <div className="container4">
            
                <h1>
                    <Link to="/start-over-here">
                        <img style={{width:180}} alt="Loading..." src={process.env.PUBLIC_URL+'/logo.png'}></img>
                    </Link>
                </h1>
        
        </div>            
    );
}

export default StartPage;