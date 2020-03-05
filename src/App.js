import React, { useEffect } from 'react';
import NavBar from './components/NavBar/NavBar'
import Login from './components/Login/Login'
import './App.css';
import Home from './components/Home/Home';
import InventoryList from './components/InventoryList/InventoryList';
import { Route,Switch} from 'react-router-dom';
import { get } from './services';

function App() {

  useEffect(()=>{
    //get("customers");
  },[])
  return (
<>
    <NavBar/>
    <Switch>
      <Route path='/login' component={Login}/>
      <Route path='/home' component={Home}/>
      <Route path='/lists' component={InventoryList}/>
    </Switch>
</>
)
}

export default App;
