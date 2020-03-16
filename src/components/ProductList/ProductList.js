import React, { useState,useEffect } from 'react'
import InventoryList from '../InventoryList/InventoryList'
import { get, post } from '../../services';
import GenericModal from '../Modals/GenericModal';
import CreateProduct from '../CreateForms/CreateProduct';
import './ProductList.css'
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const ProductList=(props)=>{

    const [list,setList] = useState([]);
    const [modelList,setModelList] = useState([]);
    const [brandList,setBrandList] = useState([]);
    const [listBackup,setListBackup] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [active,setActive] = useState({
        stock: true,
        sold:false, 
        borrowed: false, 
        rented:false, 
        support:false, 
        notFound:false
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
            console.log(products);
            var lista=[];
            products.data.map((elem,index)=>{
                 lista.push(elem.model);
            })
            setModelList([...new Set(lista)]);
            setListBackup(products.data);
            setList(products.data);
            setFilterEquipment(products.data);
            setCantPBX(products.data.filter(element => element.equipment == "IP PBX").length);
            setcantExpModules(products.data.filter(element => element.equipment == "Exp. Module").length);
            setCantGW(products.data.filter(element => element.equipment == "Gateway").length);
            setCantHS(products.data.filter(element => element.equipment == "Headset").length);
            setCantIM(products.data.filter(element => element.equipment == "Int. Module").length);
            setCantIP(products.data.filter(element => element.equipment == "IP Phone").length);
            setCantLCD(products.data.filter(element => element.equipment == "LCD EXP20").length);
            setCantSW(products.data.filter(element => element.equipment == "Switch").length);
            setIsLoading(false);
            console.log(list);
        }
        getList();

    },[path])
    
    
    const [filterEquipment,setFilterEquipment] = useState(list);
    const [idEquipment,setidEquipment] = useState("");
    
    useEffect(()=>{
        if(idEquipment!=""){
            setFilterEquipment( list.filter((Equipo) => Equipo.equipment == idEquipment ));
            setListBackup(list.filter((Equipo) => Equipo.equipment == idEquipment ));
            console.log(listBackup);
            var lista=[];
            list.filter((Equipo) => Equipo.equipment == idEquipment ).map((elem,index)=>{
                 lista.push(elem.model);
            })
            console.log()
            setModelList([...new Set(lista)]);
         }
         
    },[idEquipment])   

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

    return(
        <>
        <div className="container">
       <div className="row">
                <div className="col-md-6">
                    <h2>{props.title}</h2>
                    <button className="btn btn-dark" id="register" onClick={()=>setModalShow(true)}>Registrar</button>
                </div>
                <div className="col-md-6">
                </div>
            </div>
            <hr/>
        <div className="card">
            <div className="card-header">
               <h5> Resumen de Inventario</h5>
               <ul className="nav nav-tabs card-header-tabs">
               <li className="nav-item">
               <button className={active.stock? "nav-link active"  : "nav-link"} onClick={()=>getProducts("stock")}>Stock</button>
               </li>
               <li className="nav-item">
               <button className={ active.sold? "nav-link active"  : "nav-link "} onClick={()=>getProducts("sold")}>Vendidos</button>
               </li>
               <li className="nav-item">
               <button className={ active.borrowed? "nav-link active"  : "nav-link "} onClick={()=>getProducts("borrowed")}>Prestados</button>
               </li>
                <li className="nav-item">
                    <button className={ active.rented? "nav-link active"  : "nav-link "}  onClick={()=>getProducts("rented")}>En alquiler</button>
                </li>
                <li className="nav-item">
                    <button className={ active.support? "nav-link active"  : "nav-link "}  onClick={()=>getProducts("support")}>Soporte</button>
                </li>
                <li className="nav-item">
                    <button className={ active.notFound? "nav-link active"  : "nav-link "} onClick={()=>getProducts("NotFound")}>No encontrados</button>
                </li>
    </ul>
            </div>
            <div className="card-body">
                <h5 className="card-title">Total de equipos: {isLoading? "...":list.length}</h5>
                <hr/>
                <div className="row">
                    <div className="col-md-3">
                        <p className="card-text">
                            <button type="button" className="btn btn-light" onClick={()=>{setidEquipment("IP PBX");setTitle("Centrales Telefonicas")}}>Centrales Telefónicas: {isLoading? "...":cantPBX}</button> 
                        </p>
                        <p className="card-text">
                            <button type="button" className="btn btn-light" onClick={()=>{setidEquipment("Exp. Module");setTitle("Modulos de Expansión")}}>Modulos de Expansión: {isLoading? "...":cantExpModules}</button>
                        </p>
                    </div>
                    <div className="col-md-3">
                        <p className="card-text">
                            <button type="button" className="btn btn-light" onClick={()=>{setidEquipment("Gateway");setTitle("Gateways")}}>Gateways: {isLoading? "...":cantGW}</button>
                        </p>
                        <p className="card-text">
                            <button type="button" className="btn btn-light" onClick={()=>{setidEquipment("Headset");setTitle("HeadSets")}}>Headsets: {isLoading? "...":cantHS}</button> 
                        </p>
                    </div>
                    <div className="col-md-3">
                        <p className="card-text">
                            <button type="button" className="btn btn-light" onClick={()=>{setidEquipment("Int. Module");setTitle("Módulos Internos")}}>Módulos Internos: {isLoading? "...":cantIM}</button>
                        </p>
                        <p className="card-text">
                            <button type="button" className="btn btn-light" onClick={()=>setidEquipment("IP Phone")}>Teléfonos IP: {isLoading? "...":cantIP}</button>
                        </p>
                    </div>
                    <div className="col-md-3">
                        <p className="card-text">
                            <button  type="button" className="btn btn-light" onClick={()=>setidEquipment("LCD EXP20")}>LCD Exp20: {isLoading? "...":cantLCD}</button>
                        </p>
                        <p className="card-text">
                            <button type="button" className="btn btn-light" onClick={()=>setidEquipment("Switch")}>Switch: {isLoading? "...":cantSW}</button>
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
                            <th><div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                 Modelo
                                </button>
                                     <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                     <button className="dropdown-item" type="button" onClick={()=>filtrar('todos')} >Todos</button>
                                        {modelList.map((model)=>
                                            <button className="dropdown-item" type="button" onClick={()=>filtrar(model)} >{model}</button>
                                        )}
                                     
                                       {/* <button className="dropdown-item" type="button" onClick={()=>filtrar('TG100')} >TG100</button>
                                       <button className="dropdown-item" type="button" onClick={()=>filtrar('TG200')} >TG200</button> */}
                                     </div>
                                 </div>
                            </th> 
                           
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
                         {filterEquipment.map((listElement)=>
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
           }
        </div>
 
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