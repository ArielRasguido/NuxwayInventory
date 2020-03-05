import React, { useState, useReducer } from 'react'
import { post } from '../../services';

const CreateClient=()=>{
    
    const [user, setUser] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            fullName:'',
            company:'',
            mail:'',
            address:'',
            telephone:0,
            cellphone:0,
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
            <form onSubmit={(event)=>{sendInfo(event)}}>
                    <div className="form-group row">
                        <label for="fullName">Nombre Completo:</label>
                        <input  type="text" className="form-control" id="fullName" name="fullName" aria-describedby="emailHelp"
                        onChange={(event)=>changeHandler(event)}
                        value={user.fullName}
                        />
                    </div>
                    <div className="form-group row">
                        <label for="company">Compañia</label>
                        <input type="text" className="form-control" id="company" name="company"
                          onChange={(event)=>changeHandler(event)}
                          value={user.company}/>
                    </div>
                    <div className="form-group row">
                        <label for="email">Email</label>
                        <input type="email" className="form-control" id="email" name="mail"
                          onChange={(event)=>changeHandler(event)}
                          value={user.email}/>
                    </div>
                    <div className="form-group row">
                        <label for="address">Direccion</label>
                        <input type="text" className="form-control" id="address" name="address"
                          onChange={(event)=>changeHandler(event)}
                          value={user.address}/>
                    </div>
                    <div className="form-group row">
                        <label for="telephone">Telefono</label>
                        <input type="text" className="form-control" id="telephone" name="telephone"
                          onChange={(event)=>changeHandler(event)}
                          value={user.telephone}/>
                    </div>
                    <div className="form-group row">
                        <label for="cellphone">Celular</label>
                        <input type="text" className="form-control" id="cellphone" name="cellphone"
                          onChange={(event)=>changeHandler(event)}
                          value={user.cellphone}/>
                    </div>
                    <div className="form-group row">
                        <button className="btn btn-primary" type="submit">Registrar</button>
                    </div>
            </form>
    )
}
export default CreateClient