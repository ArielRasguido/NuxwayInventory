import React from 'react';
import './Home.css'
import Subview from './subviewHome';

const Home = ()=>{

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                <h1 id="home-title">Bienvenido</h1>
                <p>Bienvenido al inventario de equipos de Nuxway, en la parte derecha selecione la acción que desea realizar.</p>
                <small>(Porfavor sea cuidadoso con el manejo de la información)</small>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-6">
                            <Subview type={"clientes"}/>
                        </div>
                        <div className="col-md-6">
                            <Subview type={"productos"}/>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    );
}

export default Home;