import React, { useState, useReducer } from 'react'
import { post } from '../../services';
import './CreateClient.css'
const Create=(props)=>{
    
    const [user, setUser] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        props.user
      );
    function sendInfo(event){
        event.preventDefault();
        post(props.path,user);
    }
    function changeHandler(event)
    {     
        event.preventDefault();
        console.log(event);
        var value = event.target.value;
        var name = event.target.name;
       setUser({[name]:value});
       console.log(user);
    }
    return(
            <form className="registerform" onSubmit={(event)=>{sendInfo(event)}}>
                {props.client.map((prop,index)=>{
                    return(
                        <div className="form-group row">
                            <div className="col-md-5">
                                <label htmlFor={prop.fullName}>{prop.label}</label>
                            </div>
                            <div className="col-md-7">
                                <input  type="text" className="form-control" placeholder={prop.placeholder} id={prop.fullName} name={prop.name} aria-describedby="emailHelp"
                                onChange={(event)=>changeHandler(event)}
                                />
                            </div>
                        </div>
                    )
                })}
                    <div className="form-group row">
                        <button className="btn btn-warning registerbuttons" type="submit">Registrar</button>
                        <button className="btn btn-secondary registerbuttons">Cancelar</button>
                    </div>
            </form>
    )
}
export default Create;