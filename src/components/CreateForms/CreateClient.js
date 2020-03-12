import React, { useState, useReducer } from 'react'
import { post } from '../../services';
import './CreateClient.css'
import Create from './Create';
const CreateClient=(props)=>{

      const data ={
        fullName:'',
        company:'',
        mail:'',
        address:'',
        telephone:undefined,
        cellphone:undefined,
    }
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
    return(
          <Create onHide={props.onHide} selectedUSer={props.selectedUSer} edit={props.edit} user={data} client={client} path={"customers"}/>
    )
}
export default CreateClient