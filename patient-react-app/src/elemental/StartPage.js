import React from 'react';
import { Link } from 'react-router-dom';

function StartPage(props){
    return (
        <div>
            <h1>
                <Link to="/start-over-here">Mediworld</Link>
            </h1>
        </div>
    );
}

export default StartPage;