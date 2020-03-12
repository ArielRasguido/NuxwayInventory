import React, { useState,useEffect } from 'react'
import InventoryList from '../InventoryList/InventoryList'
import { get, post } from '../../services';
import GenericModal from '../Modals/GenericModal';
import CreateProduct from '../CreateForms/CreateProduct';

const ProductList=(props)=>{

    const [list,setList] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(()=>{
        async function getList(){
            const products = await get("products");
            console.log(products);
            setList(products.data);
            setFilterEquipment(products.data);
            console.log(list);
        }
        getList();
    },[])
    
    
    const [filterEquipment,setFilterEquipment] = useState(list);
    const [idEquipment,setidEquipment] = useState("");
    
    useEffect(()=>{
        if(idEquipment!=""){
            setFilterEquipment( list.filter((Equipo) => Equipo.equipment == idEquipment ));
            
         }
         
    },[idEquipment])   

    return(
        <>
        <div>
        </div>
        <div class="card">
            <div class="card-header">
               <h5> Resumen de Inventario</h5>
               <ul class="nav nav-tabs card-header-tabs">
               <li class="nav-item">
               <a class="nav-link active" href="#">Stock</a>
               </li>
               <li class="nav-item">
               <a class="nav-link" href="#">Vendidos</a>
               </li>
               <li class="nav-item">
               <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">Prestados</a>
               </li>
      <li class="nav-item">
        <a class="nav-link" href="#">En alquiler</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Soporte</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">No encontrados</a>
      </li>
    </ul>
            </div>
            <div class="card-body">
                <h5 class="card-title">Total de equipos: {list.length}</h5>
                <hr/>
                <div className="row">
                    <div className="col-md-3">
                        <p class="card-text">
                            <button type="button" class="btn btn-light" onClick={()=>setidEquipment("IP PBX")}>Centrales Telefónicas:</button> 
                        45</p>
                        <p class="card-text">
                            <button type="button" class="btn btn-light" onClick={()=>setidEquipment("Exp. Module")}>Modulos de Expansión:</button>
                        23</p>
                    </div>
                    <div className="col-md-3">
                        <p class="card-text">
                            <button type="button" class="btn btn-light" onClick={()=>setidEquipment("Gateway")}>Gateways:</button>
                        15</p>
                        <p class="card-text">
                            <button type="button" class="btn btn-light" onClick={()=>setidEquipment("Headset")}>Headsets:</button> 
                        78</p>
                    </div>
                    <div className="col-md-3">
                        <p class="card-text">
                            <button type="button" class="btn btn-light" onClick={()=>setidEquipment("Int. Module")}>Módulos Internos:</button>
                        56</p>
                        <p class="card-text">
                            <button type="button" class="btn btn-light" onClick={()=>setidEquipment("IP Phone")}>Teléfonos IP:</button>
                        86</p>
                    </div>
                    <div className="col-md-3">
                        <p class="card-text">
                            <button type="button" class="btn btn-light" onClick={()=>setidEquipment("LCD EXP20")}>LCD Exp20:</button>
                        11</p>
                        <p class="card-text">
                            <button type="button" class="btn btn-light" onClick={()=>setidEquipment("Switch")}>Switch:</button>
                        13</p>

                    </div>
                </div>
                
                
            </div>
            </div>
           <InventoryList setModal={() => setModalShow(true)} title={props.title} >
                <thead className="thead-light">
                         <tr>
                            {/* <th>ID</th> */}
                            {/* <th>Equipo</th> */}
                            <th><div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                 Modelo
                                </button>
                                     <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                       <button class="dropdown-item" type="button" >S20</button>
                                       <button class="dropdown-item" type="button" >S50</button>
                                     </div>
                                 </div>
                            </th> 
                           
                            <th>Marca</th> 
                            <th>Numero de serial</th>
                            
                            <th>Fecha de ingreso</th>
                            <th>Fecha de salida</th>
                            {/* <th>Estado</th> */}
                            <th>Ubicacion</th>
                            {/* <th>ID de cliente</th> */}
                            <th>Observaciones</th>
                         </tr>
                     </thead>
                     <tbody>
                         {filterEquipment.map((listElement)=>
                         <tr key={listElement.id}>
                             {/* <td> {listElement.id}</td> */}
                             {/* <td> {listElement.equipment}</td> */}
                             <td> {listElement.model}</td>
                             <td> {listElement.brand}</td>
                             <td> {listElement.serial_Number}</td>
                             <td> {listElement.entry_Warehouse}</td>
                             <td> {listElement.out_Warehouse}</td>
                             {/* <td> {listElement.status}</td> */}
                             <td> {listElement.location}</td>
                             {/* <td> {listElement.customer_ID}</td> */}
                             <td> {listElement.observations}</td>
                         </tr>
                         )}
                     </tbody>
           </InventoryList>
            <GenericModal
             show={modalShow}
             onHide={() => setModalShow(false)}
             title="Registrar Producto"
            >
                <CreateProduct/>

            </GenericModal>
        </>
    );
}
export default ProductList;