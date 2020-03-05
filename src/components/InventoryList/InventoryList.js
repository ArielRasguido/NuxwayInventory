import React, { useState,useEffect } from 'react'
import './InventoryList.css'
import { get, post } from '../../services';
import GenericModal from '../Modals/GenericModal';
import CreateClient from '../CreateClient/CreateClient';

const InventoryList=()=>{

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
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h2>Clientes</h2>
                    <button onClick={() => setModalShow(true)}>Registrar Cliente</button>
                </div>
                <div className="col-md-6">
                </div>
            </div>
            <hr/>
            <div className="row">
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-warning my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
            <div className="row">
                <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                        <th>ID</th>
                        <th>Nombre Completo</th>
                        <th>Compañia</th>
                        <th>Email</th>
                        <th>Dirección</th>
                        <th>Telefono</th>
                        <th>Celular</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {list.map((listElemt)=>
                                <tr key={listElemt.id}>
                                <td>{listElemt.id}</td>
                                <td>{listElemt.fullName}</td>
                                <td>{listElemt.company}</td>
                                <td>{listElemt.mail}</td>
                                <td>{listElemt.address}</td>
                                <td>{listElemt.telephone}</td>
                                <td>{listElemt.cellphone}</td>
                                </tr>
                        )}
                       
                    </tbody>
                </table>
            </div>
            <GenericModal
             show={modalShow}
             onHide={() => setModalShow(false)}
             title="Registrar Cliente"
            >
                <CreateClient/>

            </GenericModal>
        </div>
    )
}
export default InventoryList;