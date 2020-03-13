import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = ()=>{

    return(
        <div className="splash-screen">
      Espere un momento mientras carga el contenido...
      <div className="loading-dot">.</div>
    </div>
    );
}

export default LoadingScreen;