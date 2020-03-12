import React, { useEffect } from 'react';
import NavBar from './components/NavBar/NavBar'
import Login from './components/Login/Login'
import './App.css';
import Home from './components/Home/Home';
import { Route,Switch} from 'react-router-dom';
import ClientList from './components/ClientList/ClientList';
import ProductList from './components/ProductList/ProductList';
function App() {

  useEffect(()=>{
    //get("customers");
  },[])
  return (
<>
    <NavBar/>
    <Switch>
      <Route path='/login' component={Login}/>
      <Route exact path='/' component={Home}/>
      <Route path="/Clientlist" render={()=>(<ClientList title="Clientes"/>)}/>
      <Route path="/Productlist" render={()=>(<ProductList title="Productos"/>)}/>
    </Switch>
</>
)
}

export default App;
