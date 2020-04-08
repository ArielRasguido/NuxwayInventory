import React, { useState, useEffect } from 'react'
import Create from './Create';

const CreateProduct=(props)=>{

    const [clients, setClients] = useState([])
    const current_datetime = new Date()
    const [data, setData] = useState({
      equipment:'',
      model:'',           
      brand:'',
      serial_Number:'',
      entry_Warehouse: getCurrentDate(),
      out_Warehouse:"0001-01-01",
      status:'Stock',
      location:'',
      customer_ID:1,
      observations:''
    })


  function getCurrentDate(){
      
      let newDate = new Date()
      let day = newDate.getDate();
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear();
      return `${year}-${month<10?`0${month}`:`${month}`}-${day<10?`0${day}`:`${day}`}`
  }

    useEffect(()=>{
      if(props.clients)
      {
        var clientNames = [];
        props.clients.data.map((client)=>{
            clientNames.push(client.company);
        })
        setClients(clientNames);
      }
    

      if(props.edit){
        setData(props.data);
      }
    },[props.data])

    const client = [
      { label:'Equipo', placeholder:'Tipo de producto', name:'equipment', required:true },
      { label:'Modelo', placeholder:'Modelo de producto', name:'model' , required:true },
      { label:'Marca', placeholder:'Marca de producto', name:'brand', required:true },
      { label:'Numero de serial', placeholder:'Serial de producto', name:'serial_Number' , required:true },
      { label:'Fecha de ingreso', placeholder:'Ingreso a almacen', name:'entry_Warehouse',type:"date"},
      { label:'Fecha de salida', placeholder:'Salida de almacen', name:'out_Warehouse',type:"date" },
      { label:'Estado', placeholder:'Estado de producto',type:'select',values:['Stock','Vendido','Prestamo','Soporte','Alquiler'], name:'status', required:true },
      { label:'Ubicación', placeholder:'Ubicación de producto', name:'location' },
      { label:'ID de cliente', placeholder:'Codigo de identifacador de cliente',type:'select',values:clients, name:'customer_ID' },
      { label:'Observaciones', placeholder:'Escriba aqui...', name:'observations',type:'textarea'}
    ];
      
  return(<Create clients={props.clients} resultTitle={"Registro Existoso!"} message={"Producto Registrado"} refresh={props.refresh} onHide={props.onHide} edit={props.edit} data={data} fields={client} path={"products"}/>)

}
export default CreateProduct