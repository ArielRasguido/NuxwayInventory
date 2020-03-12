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
            console.log(list);
        }
        getList();
    },[]) 

    return(
        <>
        <div>
        </div>
           <InventoryList setModal={() => setModalShow(true)} title={props.title} total={list.length}>
                <thead className="thead-light">
                         <tr>
                            {/* <th>ID</th> */}
                            {/* <th>Equipo</th> */}
                            <th>Modelo</th> 
                            <th>Marca</th> 
                            <th>Numero de serial</th>
                            
                            <th>Ingreso</th>
                            <th>Salida</th>
                            {/* <th>Estado</th> */}
                            <th>Ubicacion</th>
                            {/* <th>ID de cliente</th> */}
                            <th>Observaciones</th>
                         </tr>
                     </thead>
                     <tbody>
                         {list.map((listElement)=>
                         <tr key={listElement.id}>
                             {/* <td> {listElement.id}</td> */}
                             {/* <td> {listElement.equipment}</td> */}
                             <td> {listElement.model}</td>
                             <td> {listElement.brand}</td>
                             <td> {listElement.serial_Number}</td>
                             <td> {new Date(listElement.entry_Warehouse).toLocaleDateString()}</td>
                             <td> {new Date(listElement.out_Warehouse).toLocaleDateString()}</td>
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