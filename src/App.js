import React, { useEffect } from 'react';
import NavBar from './components/NavBar/NavBar'
import Login from './components/Login/Login'
import './App.css';
import Home from './components/Home/Home';
import InventoryList from './components/InventoryList/InventoryList';
import { Route,Switch} from 'react-router-dom';
import { get } from './services';
<<<<<<< HEAD
import Footer from './components/Footer/Footer'

=======
import ClientList from './components/ClientList/ClientList';
import ProductList from './components/ProductList/ProductList';
>>>>>>> d5004e4eb0ea706dbaeed5fa3762da4c3ad45aaf
function App() {

  useEffect(()=>{
    //get("customers");
  },[])
  return (
<>
    <NavBar/>
<<<<<<< HEAD
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/home' component={Home}/>
        <Route path='/lists' component={InventoryList}/>
      </Switch>
=======
    <Switch>
      <Route path='/login' component={Login}/>
      <Route path='/home' component={Home}/>
      <Route path="/Clientlist" render={()=>(<ClientList title="Clientes"/>)}/>
      <Route path="/Productlist" render={()=>(<ProductList title="Productos"/>)}/>
    </Switch>
>>>>>>> d5004e4eb0ea706dbaeed5fa3762da4c3ad45aaf
</>
)
}

export default App;
