import React from 'react';
import {Link} from 'react-router-dom'
import './Login.css'

const Login = ()=>{
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img id="imagenCompany" src={require('../../assets/images.png')} alt="Logo-nuxway" />
                </div>
                <div className="col-md-6">
                    <form id="loginForm">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="email" className="form-control" id="username" aria-describedby="emailHelp"/>
                            <small id="emailHelp" className="form-text text-muted">Introduzca el nombre de usuario asignado.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password"/>
                        </div>
                        <Link type="submit" className="btn btn-warning" to="/home">Enviar</Link>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default Login;