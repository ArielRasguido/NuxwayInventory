import React, { useState,useEffect } from 'react'
import InventoryList from '../InventoryList/InventoryList'
import { get, post } from '../../services';
import GenericModal from '../Modals/GenericModal';
import CreateClient from '../CreateForms/CreateClient';

const ClientList=(props)=>{

    const [list,setList] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(()=>{
        async function getList(){
            const clients = await get("customers");
            console.log(clients);
            setList(clients.data);
            console.log(list);
        }
        getList();
    },[]) 

    return(
        <>
           <InventoryList setModal={() => setModalShow(true)} title={props.title}>
                <thead className="thead-light">
                         <tr>
                         <th>Editar</th>
                         {/* <th>ID</th>  */}
                         <th>Nombre Completo</th> 
                         <th>Compañia</th> 
                         <th>Email</th>  
                         <th>Direccion</th>
                         <th>Telefono</th>
                         <th>Celular</th>
                         </tr>   
                     </thead>
                     <tbody>
                         {list.map((listElement)=>
                         <tr key={listElement.id}>
                             <td><button onClick={() => setModalShow(true)} id="edit-button"><img id="edit" src={require('../../assets/pencil-edit-button.svg')}/></button></td>
                             {/* <td> {listElement.id}</td> */}
                             <td> {listElement.fullName}</td>
                             <td> {listElement.company}</td>
                             <td> {listElement.mail}</td>
                             <td> {listElement.address}</td>
                             <td> {listElement.telephone}</td>
                             <td> {listElement.cellphone}</td>
                         </tr>
                         )}
                     </tbody>
           </InventoryList>
            <GenericModal
             show={modalShow}
             onHide={() => setModalShow(false)}
             title="Registrar Cliente"
            >
                <CreateClient/>

            </GenericModal>
        </>
    );
}
export default ClientList;