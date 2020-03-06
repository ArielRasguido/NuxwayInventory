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
      const [client,setClient] = useState([
          {
            label:'Nombre Completo',
            placeholder:'Representante de la empresa',
            name:'fullName'
          },
          {
            label:'Empresa',
            placeholder:'Nombre de la empresa',
            name:'company'
          },
          {
            label:'Email',
            placeholder:'Direccion de correo electronico',
            name:'mail'
          },
          {
            label:'Dirección',
            placeholder:'Dirección de la empresa',
            name:'address'
          },
          {
            label:'Telefono',
            placeholder:'Teléfono de la empresa',
            name:'telephone'
          },
          {
            label:'Celular',
            placeholder:'Celular del representante',
            name:'cellphone'
          }
      ]);
    function sendInfo(event){
        event.preventDefault();
        post("customers",user);
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
                {client.map((prop,index)=>{
                    return(
                <div className="form-group row">
                    <div className="col-md-5">
                        <label htmlFor={prop.fullName}>{prop.label}</label>
                    </div>
                    <div className="col-md-7">
                        <input  type="text" className="form-control" placeholder={prop.placeholder} id={prop.fullName} name={prop.name} aria-describedby="emailHelp"
                        onChange={(event)=>changeHandler(event)}
                        required
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
export default CreateClient