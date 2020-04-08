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
          console.log(props.clients);
        if(props.edit){
            setData(props.data);
            setData({...props.data,entry_Warehouse:getDate(props.data.entry_Warehouse)});
        }
    },[props.edit,props.data])

    function getDate(date)
    {
        var date = new Date(date);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return `${year}-${month<10?`0${month}`:`${month}`}-${day<10?`0${day}`:`${day}`}`
    }

    async function sendInfo(event){
        console.log(data);
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
        if(name==='model')
            value = value.toUpperCase();
        setData({[name]:value});
    }

    function changeHandlerSelect(event)
    {     
        event.preventDefault();
        var value = event.target.value;
        var name = event.target.name;
        var client = props.clients.data.filter(c=>c.company===value);
        console.log(client[0].id);
        setData({[name]:client[0].id});
    }

    function successModal(){
        setShowModal(false);
        if(props.message === message){
            props.refresh();
            props.onHide();
        }
        
    }

    function inputType(prop){
        switch (prop.type) {
            case 'select':
                return( <select id={prop.name} className="form-control"
                name={prop.name}
                required={prop.required}
                value={data[prop.name].id}
                onChange={e=>(changeHandlerSelect(e))}
                >
                    {/* <option selected disabled>Seleccionar...</option> */}
                    {prop.values.map((value,index)=>
                        <option key={index} value={value}>{value}</option>
                    )}
                    
                </select>)
            case 'textarea':
                return( <textarea  type={prop.type} className="form-control" placeholder={prop.placeholder} id={prop.fullName} name={prop.name} aria-describedby="emailHelp"
                value={data[prop.name]}
                onChange={(event)=>changeHandler(event)}
                disabled={isLoading}
                required={prop.required}
                />)
            default:
                return( <input  type={prop.type} className="form-control" placeholder={prop.placeholder} id={prop.fullName} name={prop.name} aria-describedby="emailHelp"
                value={data[prop.name]}
                onChange={(event)=>changeHandler(event)}
                disabled={isLoading}
                required={prop.required}
                />)
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

                                {inputType(prop)}
                                {/* {prop.type!=='select'?
                                   <input  type={prop.type} className="form-control" placeholder={prop.placeholder} id={prop.fullName} name={prop.name} aria-describedby="emailHelp"
                                   value={data[prop.name]}
                                   onChange={(event)=>changeHandler(event)}
                                   disabled={isLoading}
                                   required={prop.required}
                                   />
                                :
                                    <select id={prop.name} className="form-control"
                                    name={prop.name}
                                    required={prop.required}
                                    value={data[prop.name].id}
                                    onChange={e=>(changeHandlerSelect(e))}
                                    >
                                        {prop.values.map((value,index)=>
                                            <option key={index} value={value}>{value}</option>
                                        )}
                                        
                                    </select>
                                } */}
                             
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