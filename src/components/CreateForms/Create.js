import React, { useReducer, useEffect, useState } from 'react'
import { post, getById, put } from '../../services';
import './CreateClient.css'
import GenericModal from '../Modals/GenericModal';
const Create=(props)=>{
    const [showModal,setShowModal] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [message,setMessage] = useState(props.message);
    const [resultTitle,setResultTitle] = useState(props.resultTitle);
    const [enroll,setEnroll] = useState(false);
    const [data, setData] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        props.data
      );

      useEffect(()=>{
        if(props.edit){
            setData(props.data);
        }
    },[props.edit,props.data])

    async function sendInfo(event){
        event.preventDefault();
        setEnroll(true);
        setIsLoading(true);
        try{
            if(props.edit===true)
            {
               var res = await put(props.path,data,props.data.id);
            }
            else{
                var res = await post(props.path,data);
            }
            setResultTitle(props.resultTitle);
            setMessage(props.message);
        }
        catch(error){
            setResultTitle("Registro Fallido");
            setMessage(error.message);
            console.log("Error:",error.response);
        }
          
            setEnroll(false);
            setIsLoading(false);
            setShowModal(true);
       
        
    }

    function changeHandler(event)
    {     
        event.preventDefault();
        var value = event.target.value;
        var name = event.target.name;
        setData({[name]:value});
    }

    function successModal(){
        setShowModal(false);
        if(props.message === message){
            props.refresh();
            props.onHide();
        }
        
    }


    return(
        <>
            <form className="registerform" onSubmit={(event)=>{sendInfo(event)}} >
                {props.fields.map((prop,index)=>{
                    return(
                        <div key={index} className="form-group row">
                            <div className="col-md-5">
                                <label htmlFor={prop.fullName}>{prop.label}</label>
                            </div>
                            <div className="col-md-7">
                                <input  type={prop.type} className="form-control" placeholder={prop.placeholder} id={prop.fullName} name={prop.name} aria-describedby="emailHelp"
                                value={data[prop.name]}
                                onChange={(event)=>changeHandler(event)}
                                disabled={isLoading}
                                required={prop.required}
                                />
                            </div>
                        </div>
                    )
                })}
                <div id="loading">
                    {isLoading?
                    <div className="spinner-border text-warning" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>:""}
                </div>
                <div className="form-group row">
                    <button className="btn btn-warning registerbuttons" type="submit" disabled={enroll}>
                        {enroll?"Registrando...":"Registrar"}
                    </button>
                    <div className="btn btn-secondary registerbuttons" onClick={()=>{if(!enroll){props.onHide()}}}>Cancelar</div>
                </div>
            </form>
            <GenericModal
            show={showModal}
            size="sm"
            name={resultTitle}
            onHide={()=>{setShowModal(false)}}
            >
                <>
                <div>{message}</div>
                <div className="form-group row">
                    <button className="btn btn-warning registerbuttons" onClick={successModal}>
                        Aceptar
                    </button>
                </div>
                </>
            </GenericModal>
            </>
    )
}
export default Create;