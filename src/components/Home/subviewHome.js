import React from 'react';
import './Home.css';

const Subview = (props)=>{
    return(
        <div>
            <img src={require(`../../assets/${props.type}.png`)} alt="subview-title"/>
            <h3 className="text-center">{props.type}</h3>
            <p className="text-center">Ver lista de {props.type}</p>
            <button className="btn btn-warning d-block mx-auto">Ver</button>
        </div>
    );

}

export default Subview;