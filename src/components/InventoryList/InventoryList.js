import React, { useState,useEffect } from 'react'
import './InventoryList.css'
import { get, post } from '../../services';
import GenericModal from '../Modals/GenericModal';
import CreateClient from '../CreateForms/CreateClient';

const InventoryList=(props)=>{

       return(
        <div className="container">
    
            {props.products?
             <>
             <h3 id="sub-title">{props.title}</h3>
             <hr/>
             </>:""
            }
           
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