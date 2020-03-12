import React, { useState,useEffect } from 'react'
import './InventoryList.css'
import { get, post } from '../../services';
import GenericModal from '../Modals/GenericModal';
import CreateClient from '../CreateForms/CreateClient';

const InventoryList=(props)=>{

       return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h2>{props.title}</h2>
                    <button className="btn btn-dark" id="register" onClick={props.setModal}>Registrar</button>
                </div>
                <div className="col-md-6">
                </div>
            </div>
            <hr/>
            <div class="card">
            <div class="card-header">
               <h5> Resumen de Inventario</h5>
               <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item">
        <a class="nav-link active" href="#">Stock</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Vendidos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">Prestados</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">En alquiler</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Soporte</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">No encontrados</a>
      </li>
    </ul>
            </div>
            <div class="card-body">
                <h5 class="card-title">Total de equipos: {props.total}</h5>
                <hr/>
                <div className="row">
                    <div className="col-md-3">
                        <p class="card-text"><span>Centrales Telefónicas: </span> 45</p>
                        <p class="card-text"><span>Modulos de Expansión: </span> 23</p>
                    </div>
                    <div className="col-md-3">
                        <p class="card-text"><span>Gateways: </span> 15</p>
                        <p class="card-text"><span>Headsets: </span> 78</p>
                    </div>
                    <div className="col-md-3">
                        <p class="card-text"><span>Módulos Internos: </span> 56</p>
                        <p class="card-text"><span>Teléfonos IP: </span> 86</p>
                    </div>
                    <div className="col-md-3">
                        <p class="card-text"><span>LCD Exp20: </span> 11</p>
                        <p class="card-text"><span>Switch: </span> 13</p>

                    </div>
                </div>
                
                
            </div>
            </div>
            <h3 id="sub-title">Title</h3>
            <hr/>
            {/* <div className="row">
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-warning my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div> */}
            <div className="row">
                <table className="table">
                    {props.children}
                </table>
            </div>
        </div>
    )
}
export default InventoryList;