import React, { useState,useEffect } from 'react'
import InventoryList from '../InventoryList/InventoryList'
import { get } from '../../services';
import GenericModal from '../Modals/GenericModal';
import CreateProduct from '../CreateForms/CreateProduct';
import './ProductList.css'
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const ProductList=(props)=>{

    const [list,setList] = useState([]);
    const [clients,setClients] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const [modelList,setModelList] = useState([]);
    const [brandList,setBrandList] = useState([]);
    const [listBackup,setListBackup] = useState([]);
    const [selectedProduct,setSelectedProduct] = useState('');
    const [edit,setEdit] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [active,setActive] = useState({
        stock: true,
        sold:false, 
        borrowed: false, 
        rented:false, 
        support:false, 
        NotFound:false
    });
    const [path,setPath] = useState("products?status=stock");
    const [cantPBX,setCantPBX] = useState(null);
    const [cantExpModules,setcantExpModules] = useState(null);
    const [cantGW,setCantGW] = useState(null);
    const [cantHS,setCantHS] = useState(null);
    const [cantIM,setCantIM] = useState(null);
    const [cantIP,setCantIP] = useState(null);
    const [cantLCD,setCantLCD] = useState(null);
    const [cantSW,setCantSW] = useState(null);
    const [title,setTitle] = useState("Total de Productos");
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(()=>{
        async function getList(){
            setIsLoading(true);
            const products = await get(path);
            const clients = await get("customers");
            console.log(clients);
            setClients(clients);
            console.log(products);
            var lista=[];
            var listaBrand=[];
            products.data.map((elem,index)=>{
                 lista.push(elem.model);
                 listaBrand.push(elem.brand);
                 return 0;
            })
            setModelList([...new Set(lista)]);
            setBrandList([...new Set(listaBrand)]);
            setListBackup(products.data);
            setList(products.data);
            setFilterEquipment(products.data);
            setCantPBX(products.data.filter(element => element.equipment === "IP PBX").length);
            setcantExpModules(products.data.filter(element => element.equipment === "Exp. Module").length);
            setCantGW(products.data.filter(element => element.equipment === "Gateway").length);
            setCantHS(products.data.filter(element => element.equipment === "Headset").length);
            setCantIM(products.data.filter(element => element.equipment === "Int. Module").length);
            setCantIP(products.data.filter(element => element.equipment === "IP Phone").length);
            setCantLCD(products.data.filter(element => element.equipment === "LCD EXP20").length);
            setCantSW(products.data.filter(element => element.equipment === "Switch").length);
            setIsLoading(false);
        }
        getList();

    },[path,refresh])
    
    
    const [filterEquipment,setFilterEquipment] = useState(list);
    const [idEquipment,setidEquipment] = useState("");
    
    useEffect(()=>{
        if(idEquipment!==""){
            setFilterEquipment( list.filter((Equipo) => Equipo.equipment === idEquipment ));
            setListBackup(list.filter((Equipo) => Equipo.equipment === idEquipment ));
            var lista=[];
            var listaBrand=[];
            list.filter((Equipo) => Equipo.equipment === idEquipment ).map((elem,index)=>{
                 lista.push(elem.model);
                 listaBrand.push(elem.brand);
                 return 0;
            })
            setModelList([...new Set(lista)]);
            setBrandList([...new Set(listaBrand)]);
         }
         
    },[idEquipment,list,refresh])   

    function getProducts(type){
        setPath(`products?status=${type}`);
        setActive({[type]:true})
    }

    function filtrar(type){

        if(type==="todos"){
            setFilterEquipment(listBackup);
        }
        else{
            setFilterEquipment(listBackup.filter((e)=>e.model===type));
        }
         
    }
    function filtrarMarca(type){

        if(type==="todos"){
            setFilterEquipment(listBackup);
        }
        else{   
            setFilterEquipment(listBackup.filter((e)=>e.brand===type));
        }
         
    }

    function searchClient(id)
    {
        var client = clients.data.filter(c=>c.id===id);
        if(client.length!==0)
            return(client[0].company);
    }

    return(
        <>
        <div className="container">
       <div className="row">
                <div className="col-md-6">
                    <h2>{props.title}</h2>
                    <button className="btn btn-dark" id="register" onClick={()=>{setModalShow(true);setEdit(false);}}>Registrar</button>
                </div>
                <div className="col-md-6">
                </div>
            </div>
            <hr/>
        <div className="card">
            <div className="card-header" id="SummaryReport">
               <h5> Resumen de Inventario</h5>
               <ul className="nav nav-tabs card-header-tabs">
               <li className="nav-item">
               <button className={`nav-link ${active.stock? "active"  : ""}`} onClick={()=>getProducts("stock")}>Stock</button>
               </li>
               <li className="nav-item">
               <button className={`nav-link ${active.sold? "active"  : ""}`} onClick={()=>getProducts("sold")}>Vendidos</button>
               </li>
               <li className="nav-item">
               <button className={`nav-link ${active.borrowed? "active"  : ""}`} onClick={()=>getProducts("borrowed")}>Prestados</button>
               </li>
                <li className="nav-item">
                    <button className={ `nav-link ${active.rented? "active"  : ""}`}  onClick={()=>getProducts("rented")}>En alquiler</button>
                </li>
                <li className="nav-item">
                    <button className={ `nav-link ${active.support? "active"  : ""}`}  onClick={()=>getProducts("support")}>Soporte</button>
                </li>
                <li className="nav-item">
                    <button className={ `nav-link ${active.NotFound? "active"  : ""}`} onClick={()=>getProducts("NotFound")}>No encontrados</button>
                </li>
            </ul>
            </div>
            <div className="card-body" id="SummaryEquipment">
                <h5 className="card-title">Total de equipos: {isLoading? "...":list.length}</h5>
                <hr/>
                <div className="row">
                    <div className="col-md-3">
                        <p className="card-text">
                            <button type="button" className={`btn btn-light ${cantPBX===0?'empty':''}`} onClick={()=>{setidEquipment("IP PBX");setTitle("Centrales Telefonicas")}}>Centrales Telefónicas: {isLoading? "...":cantPBX}</button> 
                        </p>
                        <p className="card-text">
                            <button type="button" className={`btn btn-light ${cantExpModules===0?'empty':''}`} onClick={()=>{setidEquipment("Exp. Module");setTitle("Modulos de Expansión")}}>Modulos de Expansión: {isLoading? "...":cantExpModules}</button>
                        </p>
                    </div>
                    <div className="col-md-3">
                        <p className="card-text">
                            <button type="button" className={`btn btn-light ${cantGW===0?'empty':''}`} onClick={()=>{setidEquipment("Gateway");setTitle("Gateways")}}>Gateways: {isLoading? "...":cantGW}</button>
                        </p>
                        <p className="card-text">
                            <button type="button" className={`btn btn-light ${cantHS===0?'empty':''}`} onClick={()=>{setidEquipment("Headset");setTitle("HeadSets")}}>Headsets: {isLoading? "...":cantHS}</button> 
                        </p>
                    </div>
                    <div className="col-md-3">
                        <p className="card-text">
                            <button type="button" className={`btn btn-light ${cantIM===0?'empty':''}`} onClick={()=>{setidEquipment("Int. Module");setTitle("Módulos Internos")}}>Módulos Internos: {isLoading? "...":cantIM}</button>
                        </p>
                        <p className="card-text">
                            <button type="button" className={`btn btn-light ${cantIP===0?'empty':''}`} onClick={()=>setidEquipment("IP Phone")}>Teléfonos IP: {isLoading? "...":cantIP}</button>
                        </p>
                    </div>
                    <div className="col-md-3">
                        <p className="card-text">
                            <button  type="button" className={`btn btn-light ${cantLCD===0?'empty':''}`} onClick={()=>setidEquipment("LCD EXP20")}>LCD Exp20: {isLoading? "...":cantLCD}</button>
                        </p>
                        <p className="card-text">
                            <button type="button" className={`btn btn-light ${cantSW===0?'empty':''}`} onClick={()=>setidEquipment("Switch")}>Switch: {isLoading? "...":cantSW}</button>
                        </p>

                    </div>
                </div>
                
                
            </div>
            </div>
            {isLoading? <LoadingScreen/>:
           <InventoryList products={true} setModal={() => setModalShow(true)} title={title} >
                <thead className="thead-light">
                         <tr>
                            {/* <th>ID</th> */}
                            {/* <th>Equipo</th> */}
                            <th>Editar</th>
                            <th><div className="dropdown">
                                <a className="dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                 Modelo
                                </a>
                                     <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                     <button className="dropdown-item" type="button" onClick={()=>filtrar('todos')} >Todos</button>
                                        {modelList.map((model,index)=>
                                            <button key={index}  className="dropdown-item" type="button" onClick={()=>filtrar(model)} >{model}</button>
                                        )}
                                     </div>
                                 </div>
                            </th> 
                           
                            <th><div className="dropdown">
                                <a className="dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                 Marca
                                </a>
                                     <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                     <button className="dropdown-item" type="button" onClick={()=>filtrarMarca('todos')} >Todos</button>
                                        {brandList.map((brand,index)=>
                                            <button key={index} className="dropdown-item" type="button" onClick={()=>filtrarMarca(brand)} >{brand}</button>
                                        )}
                                     </div>
                                 </div>
                            </th>
                            <th>Numero de serial</th>
                            
                            <th>Ingreso</th>
                            {!active.stock?<th>Salida</th>:""}
                            
                            {/* <th>Estado</th> */}
                            {active.stock?<th>Ubicacion</th>:<th>Cliente</th>}
                            
                            {/* <th>ID de cliente</th> */}
                            <th>Observaciones</th>
                      
                         </tr>
                     </thead>
                     <tbody>
                         {filterEquipment.map((listElement)=>
                         <tr key={listElement.id}>
                             {/* <td> {listElement.id}</td> */}
                             {/* <td> {listElement.equipment}</td> */}
                             <td>
                                 <div className="row">
                                 <button onClick={() => {setModalShow(true); setSelectedProduct(listElement); setEdit(true)}} className="icon-button col-md-6"><img className="edit" src={require('../../assets/edit.svg')} alt="edit-button"/></button>
                                 </div>
                                
                             </td>
                             <td> {listElement.model}</td>
                             <td> {listElement.brand}</td>
                             <td> {listElement.serial_Number}</td>
                             <td> {new Date(listElement.entry_Warehouse).toLocaleDateString()}</td>
                             {!active.stock?<td> {new Date(listElement.out_Warehouse).toLocaleDateString()}</td>:""}
                             
                             {/* <td> {listElement.status}</td> */}
                             {active.stock?<td> {listElement.location}</td>:<td> {searchClient(listElement.customer_ID)}</td>}
                             
                             {/* <td> {listElement.customer_ID}</td> */}
                             <td> {listElement.observations}</td>
                     
                         </tr>
                         )}
                     </tbody>
           </InventoryList>
           }
        </div>
 
            <GenericModal
             show={modalShow}
             onHide={() => setModalShow(false)}
             name={edit?"Editar Producto":"Registrar Producto"}
            >
                <CreateProduct refresh={()=>setRefresh(!refresh)} clients={clients} edit={edit} brandList={brandList} data={selectedProduct} onHide={() => setModalShow(false)}/>

            </GenericModal>
        </>
    );
}
export default ProductList;