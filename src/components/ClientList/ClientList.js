import React, { useState,useEffect } from 'react'
import InventoryList from '../InventoryList/InventoryList'
import { get, deleteCustomer } from '../../services';
import GenericModal from '../Modals/GenericModal';
import CreateClient from '../CreateForms/CreateClient';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const ClientList=(props)=>{
    const [selectedUSer,setSelectedUSer] = useState({});
    const [id, setId] = useState('');
    const [modalContent,setModalContent] = useState(true);
    const [modalTitle,setModalTitle] = useState('')
    const [del, setDel] = useState(false)
    const [refresh,setRefresh] = useState(false);
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
    },[refresh]) 

    async function deleteClient()
    {
        setDel(true);
        var res = await deleteCustomer("customers",id);
        setDel(false);
        setModalShow(false);
        setRefresh(!refresh);
        console.log(res);
    }

    async function editButton(client){
        setModalContent(true);
        setModalTitle("Editar Cliente");
        setModalShow(true);
        setSelectedUSer(client);
        setEdit(true);
        
    }
    function deleteButton(identifier){
        setModalContent(false);
        setModalTitle("Eliminar Cliente");
        setId(identifier);
        setModalShow(true);
    }

    function createButton(){
        setModalShow(true);
        setEdit(false);
        setModalContent(true);
        setModalTitle("Registrar Cliente");
    }

    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h2>{props.title}</h2>
                    <button className="btn btn-dark" id="register" onClick={createButton}>Registrar</button>
                </div>
                <div className="col-md-6">
                </div>
            </div>
            <hr/>
            {isLoading? <LoadingScreen/>:  
            <InventoryList setModal={() => {setModalShow(true);setEdit(false)}} title={props.title}>
                <thead className="thead-light">
                         <tr>
                            <th>Editar</th>
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
                                     <button onClick={() =>editButton(listElement)} className="icon-button col-md-6"><img className="edit" src={require('../../assets/edit.svg')} alt="edit-button"/></button>
                                     <button className="icon-button col-md-6" onClick={()=>deleteButton(listElement.id)}><img className="edit" src={require('../../assets/delete.svg')}alt="delete-button"/></button>
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
             name={modalTitle}
            >
                {modalContent?<CreateClient refresh={()=>setRefresh(!refresh)} data={selectedUSer} edit={edit} selectedId={selectedUSer} onHide={() => setModalShow(false)}/>
                :
                <>
                    <div className="text-center">
                    ¿Esta seguro que desea continuar?
                    <div>
                    <small style={{color:"#8f8f8f"}}>(Esta operación no se puede deshacer)</small>
                    </div>
                    </div>
                    <div className="row">
                        <button className="btn btn-warning registerbuttons" onClick={deleteClient} disabled={del}>
                            {del?
                            "Eliminando...":"Eliminar"}
                        </button>
                        <div className="btn btn-secondary registerbuttons" onClick={() => {if(!del){setModalShow(false)}}}>Cancelar</div>
                    </div>
                </>
                }
            </GenericModal>
        </>
    );
}
export default ClientList;