import React, { useEffect, useState } from 'react'
import './CreateClient.css'
import Create from './Create';
const CreateClient=(props)=>{
  
    const [data, setData] = useState({
      fullName:'',
      company:'',
      mail:'',
      address:'',
      telephone:'',
      cellphone:'',
    })

    useEffect(()=>{
      if(props.edit){
        setData(props.data);
      }
    },[props.data])
    
    const client = [
          { label:'Nombre Completo', placeholder:'Representante de la empresa', name:'fullName', type:'text', required:true },
          { label:'Empresa', placeholder:'Nombre de la empresa', name:'company', required:true },
          { label:'Email', placeholder:'Direccion de correo electronico', name:'mail', type:'email', required:false },
          { label:'Dirección', placeholder:'Dirección de la empresa', name:'address', type:'text', required:true },
          { label:'Telefono', placeholder:'Teléfono de la empresa', name:'telephone', type:'tel', required:false },
          { label:'Celular', placeholder:'Celular del representante', name:'cellphone', type:'tel', required:false }
    ];

    return( <Create resultTitle={"Registro Existoso!"} message={"Cliente Registrado"} refresh={props.refresh} onHide={props.onHide} edit={props.edit} data={data} fields={client} path={"customers"}/> )
}
export default CreateClient