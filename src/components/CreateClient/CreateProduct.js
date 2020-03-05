import React, { useState, useReducer } from 'react'
import { post } from '../../services';

const CreateProduct=()=>{
    
    const [user, setUser] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
                equipment:'',
                model:'',           
                brand:'',
                serial_Number:'',
                entry_Warehouse:undefined,
                out_Warehouse:undefined,
                status:'',
                location:'',
                customer_ID:'',
                observations:'',
            
        }
      );
    function sendInfo(event){
        event.preventDefault();
        post("products",user);
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
                        <label for="equipment">Equipo:</label>
                        <input  type="text" className="form-control" id="equipment" name="equipment" aria-describedby="emailHelp"
                        onChange={(event)=>changeHandler(event)}
                        value={user.fullName}
                        />
                    </div>
                    <div className="form-group row">
                        <label for="model">Modelo:</label>
                        <input  type="text" className="form-control" id="model" name="model" aria-describedby="emailHelp"
                        onChange={(event)=>changeHandler(event)}
                        value={user.fullName}
                        />
                    </div>
                    <div className="form-group row">
                        <label for="brand">Marca</label>
                        <input type="text" className="form-control" id="brand" name="brand"
                          onChange={(event)=>changeHandler(event)}
                          value={user.company}/>
                    </div>
                    <div className="form-group row">
                        <label for="serial_Number">Numero de serial</label>
                        <input type="text" className="form-control" id="serial_Number" name="serial_Number"
                          onChange={(event)=>changeHandler(event)}
                          value={user.email}/>
                    </div>
                    <div className="form-group row">
                        <label for="entry_Warehouse">Fecha de ingreso</label>
                        <input type="text" className="form-control" id="entry_Warehouse" name="entry_Warehouse"
                          onChange={(event)=>changeHandler(event)}
                          value={user.address}/>
                    </div>
                    <div className="form-group row">
                        <label for="out_Warehouse">Fecha de salida</label>
                        <input type="text" className="form-control" id="out_Warehouse" name="out_Warehouse"
                          onChange={(event)=>changeHandler(event)}
                          value={user.telephone}/>
                    </div>
                    <div className="form-group row">
                        <label for="status">Estado</label>
                        <input type="text" className="form-control" id="status" name="status"
                          onChange={(event)=>changeHandler(event)}
                          value={user.cellphone}/>
                    </div>
                    <div className="form-group row">
                        <label for="location">Ubicacion</label>
                        <input type="text" className="form-control" id="location" name="location"
                          onChange={(event)=>changeHandler(event)}
                          value={user.cellphone}/>
                    </div>
                    <div className="form-group row">
                        <label for="customer_ID">ID de cliente</label>
                        <input type="text" className="form-control" id="customer_ID" name="customer_ID"
                          onChange={(event)=>changeHandler(event)}
                          value={user.cellphone}/>
                    </div>
                    <div className="form-group row">
                        <label for="observations">Observaciones</label>
                        <input type="text" className="form-control" id="observations" name="observations"
                          onChange={(event)=>changeHandler(event)}
                          value={user.cellphone}/>
                    </div>
                    <div className="form-group row">
                        <button className="btn btn-primary" type="submit">Registrar</button>
                    </div>
            </form>
    )
}
export default CreateProduct