import React, { useState, useReducer } from 'react'
import { post } from '../../services';
import Create from './Create';

const CreateProduct=()=>{
  
      const data = {
                equipment:'',
                model:'',           
                brand:'',
                serial_Number:'',
                entry_Warehouse:undefined,
                out_Warehouse:undefined,
                status:'',
                location:'',
                customer_ID:'',
                observations:''
        }

        const [client,setClient] = useState([
          {
            label:'Equipo',
            placeholder:'Tipo de producto',
            name:'equipment'
          },
          {
            label:'Modelo',
            placeholder:'Modelo de producto',
            name:'model'
          },
          {
            label:'Marca',
            placeholder:'Marca de producto',
            name:'brand'
          },
          {
            label:'Numero de serial',
            placeholder:'Serial de producto',
            name:'serial_Number'
          },
          {
            label:'Fecha de ingreso',
            placeholder:'Ingreso a almacen',
            name:'entry_Warehouse'
          },
          {
            label:'Fecha de salida',
            placeholder:'Salida de almacen',
            name:'out_Warehouse'
          },
          {
            label:'Estado',
            placeholder:'Estado de producto',
            name:'status'
          },
          {
            label:'Ubicación',
            placeholder:'Ubicación de producto',
            name:'location'
          },
          {
            label:'ID de cliente',
            placeholder:'Codigo de identifacador de cliente',
            name:'customer_ID'
          },
          {
            label:'Observaciones',
            placeholder:'Observaciones del producto',
            name:'observations'
          }
      ]);

    return(<Create user={data} client={client} path={"products"}/>)

}
export default CreateProduct