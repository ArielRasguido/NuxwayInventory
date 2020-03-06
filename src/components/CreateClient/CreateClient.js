import React, { useState, useReducer } from 'react'
import { post } from '../../services';
import './CreateClient.css'
const CreateClient=(props)=>{
    
    const [user, setUser] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            fullName:'',
            company:'',
            mail:'',
            address:'',
            telephone:undefined,
            cellphone:undefined,
        }
      );
    function sendInfo(event){
        event.preventDefault();
        post("customers",user);
    }
    function changeHandler(event)
    {     
        event.preventDefault();
        
        var value = event.target.value;
        var name = event.target.name;
       setUser({[name]:value});
       console.log(user);
    }
    return(
            <form className="registerform" onSubmit={(event)=>{sendInfo(event)}}>
                    <div className="form-group row">
                        <div className="col-md-5">
                            <label htmlFor="fullName">Nombre Completo:</label>
                        </div>
                        <div className="col-md-7">
                            <input  type="text" className="form-control" placeholder="Representante de la empresa" id="fullName" name="fullName" aria-describedby="emailHelp"
                            onChange={(event)=>changeHandler(event)}
                            value={user.fullName}
                            required
                            />
                        </div>  
                    </div>
                    <div className="form-group row">
                        <div className="col-md-5">
                            <label htmlFor="company">Empresa:</label>
                        </div>
                        <div className="col-md-7">
                            <input type="text" className="form-control" placeholder="Nombre de la empresa" id="company" name="company"
                            onChange={(event)=>changeHandler(event)}
                            value={user.company}
                            required
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-5">
                            <label htmlFor="email">Email:</label>
                        </div>
                        <div className="col-md-7">
                            <input type="email" className="form-control" placeholder="Direccion de correo electronico" id="email" name="mail"
                            onChange={(event)=>changeHandler(event)}
                            value={user.email}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-5">
                            <label htmlFor="address">Dirección:</label>
                        </div>
                        <div className="col-md-7">
                            <input type="text" className="form-control" placeholder="Dirección de la empresa" id="address" name="address"
                            onChange={(event)=>changeHandler(event)}
                            value={user.address}
                            required
                            />
                        </div>
                        
                    </div>
                    <div className="form-group row">
                        <div className="col-md-5">
                            <label htmlFor="telephone">Teléfono:</label>
                        </div>
                        <div className="col-md-7">
                            <input type="text" className="form-control" id="telephone" placeholder="Teléfono de la empresa" name="telephone"
                            onChange={(event)=>changeHandler(event)}
                            value={user.telephone}/>
                        </div>
                     
                    </div>
                    <div className="form-group row">
                        <div className="col-md-5">
                            <label htmlFor="cellphone">Celular:</label>
                        </div>
                        <div className="col-md-7">
                            <input type="text" className="form-control" placeholder="Celular del representante" id="cellphone" name="cellphone"
                            onChange={(event)=>changeHandler(event)}
                            value={user.cellphone}
                            required
                            />
                        </div>
                       
                    </div>
                    <div className="form-group row">
                        <button className="btn btn-warning registerbuttons" type="submit">Registrar</button>
                        <button className="btn btn-secondary registerbuttons">Cancelar</button>
                    </div>
            </form>
    )
}
export default CreateClient