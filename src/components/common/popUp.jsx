import React from "react";
import './popUp.css';

export default function popUp(props) {


    return (props.trigger) ? (
      <div className="popup">
        <div className="popup-inner">
          
          { props.children }
          <button className="boton-cerrar" onClick={() => props.setTrigger(false)}>Cerrar</button>
        </div>
      </div>
    ) : '';
}