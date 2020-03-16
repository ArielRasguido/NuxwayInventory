import React, { useReducer, useEffect, useState } from 'react'
import { post, getById, put } from '../../services';
import './CreateClient.css'
import GenericModal from '../Modals/GenericModal';
const Create=(props)=>{
    const [showModal,setShowModal] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [enroll,setEnroll] = useState(false);
    const [user, setUser] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        props.user
      );

      async function get()
      {
          setIsLoading(true);
          var resp = await getById(props.path,props.selectedUSer);
          setIsLoading(false);
          console.log(resp);
          setUser(resp.data);
      }

      useEffect(()=>{
      
        if(props.edit)
            get();
    },[props.edit])

    async function sendInfo(event){
        event.preventDefault();
        setEnroll(true);
        setIsLoading(true);
        if(props.edit===true)
        {
            await put(props.path,user,props.selectedUSer);
        }
        else{
            await post(props.path,user);
        }
        setEnroll(false);
        setIsLoading(false);
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
            props.onHide();
          }, 1000);
        
        
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
        <>
            <form className="registerform" onSubmit={(event)=>{sendInfo(event)}} >
                {props.client.map((prop,index)=>{
                    return(
                        <div key={index} className="form-group row">
                            <div className="col-md-5">
                                <label htmlFor={prop.fullName}>{prop.label}</label>
                            </div>
                            <div className="col-md-7">
                                <input  type={prop.type} className="form-control" placeholder={prop.placeholder} id={prop.fullName} name={prop.name} aria-describedby="emailHelp"
                                value={user[prop.name]}
                                onChange={(event)=>changeHandler(event)}
                                disabled={isLoading}
                                required={prop.required}
                                />
                            </div>
                        </div>
                    )
                })}
                        <div id="loading">{isLoading? 
                        
                        <div class="spinner-border text-warning" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>:""}
                        </div>
                    <div className="form-group row">
                        <button className="btn btn-warning registerbuttons" type="submit">
                            {enroll?"Registrando...":"Registrar"}</button>
                        <button className="btn btn-secondary registerbuttons" onClick={props.onHide}>Cancelar</button>
                    </div>
            </form>
            <GenericModal
            show={showModal}
            onHide={()=>{setShowModal(false)}}
            >
                Cliente Registrado!
            </GenericModal>
            </>
    )
}
export default Create;