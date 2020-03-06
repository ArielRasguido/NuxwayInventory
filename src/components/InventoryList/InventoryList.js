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
            <div className="row">
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-warning my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
            <div className="row">
                <table className="table table-bordered">
                    {props.children}
                </table>
            </div>
        </div>
    )
}
export default InventoryList;