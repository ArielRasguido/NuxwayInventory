import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom'

const Subview = (props)=>{
    return(
        <div>
            <img src={require(`../../assets/${props.type}.png`)} alt="subview-title"/>
            <div id="subview">
            <h3 className="text-center">{props.type}</h3>
                <p className="text-center">Ver lista de {props.type}</p>
                <Link id="subviewButton" className="btn btn-warning d-block mx-auto" to={props.path}>Ver</Link>
            </div>          
        </div>
    );

}

export default Subview;