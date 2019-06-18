import React from 'react';

// Importing local CSS
import './Card.css';

function Card(props){
    return(

        <div className="card">
            <img 
                className="card-img"
                src={props.obj.img}
                alt={props.obj.id}
                onClick={() => props.click(props.obj)}
            >
            </img>
        </div>
    )
}



export default Card;