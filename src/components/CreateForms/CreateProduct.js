import React, { useState, useEffect } from 'react'
import Create from './Create';

const CreateProduct=(props)=>{

    const [data, setData] = useState({
      equipment:'',
      model:'',           
      brand:'',
      serial_Number:'',
      entry_Warehouse:'',
      out_Warehouse:new Date(),
      status:'',
      location:'',
      customer_ID:'',
      observations:''
    })

    useEffect(()=>{
      if(props.edit){
        setData(props.data);
      }
    },[props.data])

    const client = [
      { label:'Equipo', placeholder:'Tipo de producto', name:'equipment', required:true },
      { label:'Modelo', placeholder:'Modelo de producto', name:'model' , required:true },
      { label:'Marca', placeholder:'Marca de producto', name:'brand' , required:true },
      { label:'Numero de serial', placeholder:'Serial de producto', name:'serial_Number' , required:true },
      { label:'Fecha de ingreso', placeholder:'Ingreso a almacen', name:'entry_Warehouse',type:"date", required:true},
      { label:'Fecha de salida', placeholder:'Salida de almacen', name:'out_Warehouse',type:"date" },
      { label:'Estado', placeholder:'Estado de producto', name:'status', required:true },
      { label:'Ubicación', placeholder:'Ubicación de producto', name:'location' },
      { label:'ID de cliente', placeholder:'Codigo de identifacador de cliente', name:'customer_ID' },
      { label:'Observaciones', placeholder:'Observaciones del producto', name:'observations' }
    ];
      
  return(<Create resultTitle={"Registro Existoso!"} message={"Producto Registrado"} refresh={props.refresh} onHide={props.onHide} edit={props.edit} data={data} fields={client} path={"products"}/>)

}
export default CreateProduct