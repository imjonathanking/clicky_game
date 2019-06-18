import React from 'react';

// Importing CSS
import './Navbar.css'

function Navbar(props){
    return(
        <div className="navbar">
            <div className="nav-title">Clicky Game</div>
            <div className="nav-status">{props.status}</div>
            <div className="nav-score">Score: {props.score} | Top Score: {props.topScore}</div>
        </div>
    )
}

export default Navbar;