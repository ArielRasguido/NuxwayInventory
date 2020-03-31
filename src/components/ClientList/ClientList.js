import React, { useState,useEffect } from 'react'
import InventoryList from '../InventoryList/InventoryList'
import { get } from '../../services';
import GenericModal from '../Modals/GenericModal';
import CreateClient from '../CreateForms/CreateClient';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const ClientList=(props)=>{
    const [selectedUSer,setSelectedUSer] = useState('');
    const [list,setList] = useState([]);
    const [edit,setEdit] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(()=>{
        async function getList(){
            setIsLoading(true);
            const clients = await get("customers");
            setIsLoading(false);
            setList(clients.data);
        }
        getList();
    },[]) 

    return(
        <>
        <div className="container">
        <div className="row">
                <div className="col-md-6">
                    <h2>{props.title}</h2>
                    <button className="btn btn-dark" id="register" onClick={()=>{setModalShow(true);setEdit(false)}}>Registrar</button>
                </div>
                <div className="col-md-6">
                </div>
            </div>
            <hr/>
            {isLoading? <LoadingScreen/>:  <InventoryList setModal={() => {setModalShow(true);setEdit(false)}} title={props.title}>
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
                             <td>
                                 <div className="row">
                                     <button onClick={() => {setModalShow(true); setSelectedUSer(listElement.id); setEdit(true)}} className="icon-button col-md-6"><img className="edit" src={require('../../assets/edit.svg')} alt="edit-button"/></button>
                                     <button className="icon-button col-md-6"><img className="edit" src={require('../../assets/delete.svg')}alt="delete-button"/></button>
                                 </div>
                             </td>
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
           </InventoryList>}
         
        </div>

            <GenericModal
             show={modalShow}
             onHide={() => setModalShow(false)}
             title="Registrar Cliente"
            >
                <CreateClient edit={edit} selectedUSer={selectedUSer} onHide={() => setModalShow(false)}/>

            </GenericModal>
        </>
    );
}
export default ClientList;