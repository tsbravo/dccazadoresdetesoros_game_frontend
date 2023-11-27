import React from "react"
import './rules.css';
import NavBar from "../common/NavBar";

function Rules() {
    return (
        <div>
        <div>
            <NavBar/>
        </div>
        <div>
            <h1 className="rules-title">Reglas del Juego</h1>

            <div className="rule-container">
                <h2 className="subtitle-rule">Previo al Juego</h2>
                <div className="rule-box">
                    <h3>Regla 1</h3>
                    <p>La expedición es de mínimo 2 y máximo 4 jugadores. A cada equipo se le asignará aleatoriamente un color para diferenciarlos en el tablero. Las opciones de estos colores serán: rojo, azul, verde y amarillo.</p>
                </div>
                <div className="rule-box">
                    <h3>Regla 2</h3>
                    <p>Cada jugador contará con un grupo de expedición de 3 pioneros. Un guerrero, un mago y un curandero.</p>
                </div>
            </div>

            <div className="rule-container">
                <h2 className="subtitle-rule">Inicio</h2>
                <div className="rule-box">
                    <h3>Regla 3</h3>
                    <p>Al comenzar una partida, cada equipo contará con un valor de 3 de energía para el guerrero, 2 para el mago y 2 para el curandero. Tendrán un recurso de cada tipo (un agua, un fuego, un hielo) y no poseerán poderes ni hechizos.</p>
                </div>
                <div className="rule-box">
                    <h3>Regla 4</h3>
                    <p>La experiencia de cada equipo vendrá dada por el nivel del jugador que lo controla.</p>
                </div>
                <div className="rule-box">
                    <h3>Regla 5</h3>
                    <p>Dentro del tablero, se encuentra una casilla destinada a cada equipo, con el objetivo de proporcionar la oportunidad de restaurar sus condiciones óptimas. Es decir, esta casilla permite que si un integrante del equipo pierde todas sus energías, el jugador es redirigido a ella y se restaura la vida de su integrante. Estas serán fácilmente reconocibles, ya que cada una tendrá el color distintivo correspondiente al equipo al que pertenece.</p>
                </div>
            </div>

            <div className="rule-container">
                <h2 className="subtitle-rule">El Juego</h2>
                <div className="rule-box">
                    <h3>Regla 6</h3>
                    <p>Los miembros de cada equipo avanzan de manera conjunta por el tablero, desplazándose de casilla en casilla. Tendrán la capacidad de moverse en cualquier dirección dentro del tablero, limitándose únicamente a las casillas que hayan sido desbloqueadas al tirar el dado.</p>
                </div>
                <div className="rule-box">
                    <h3>Regla 7</h3>
                    <p>En cada turno, los jugadores solo podrán avanzar una cantidad de casillas equivalentes al resultado obtenido en el lanzamiento del dado.</p>
                </div>
                <div className="rule-box">
                    <h3>Regla 8</h3>
                    <p>Para que un guerrero se involucre en un enfrentamiento, este debe tener por lo menos un valor de una unidad de energía.</p>
                </div>
                <div className="rule-box">
                    <h3>Regla 9</h3>
                    <p>Cuando dos guerreros se enfrentan, ambos consumen una unidad de energía.</p>
                </div>
            </div>

            <div className="rule-container">
                <h2 className="subtitle-rule">Acciones</h2>
                <div className="rule-box">
                    <h3>Regla 10</h3>
                    <p>Los equipos podrán realizar enfrentamientos entre ellos. Estos pueden ser sólo entre dos de ellos y la batalla se dará entre uno de los guerreros de cada jugador.</p>
                </div>
                <div className="rule-box">
                    <h3>Regla 11</h3>
                    <p>Cada equipo de jugadores podrá crear hechizos y pociones según los recursos que disponga y según la cantidad de energía que posea el personaje que realice la acción.</p>
                </div>
                <div className="rule-box">
                    <h3>Regla 12</h3>
                    <p>Si un jugador ya dispone de hechizos o pociones que han sido previamente invocados o preparados, tiene la opción de emplearlos en su propio equipo o en contra de sus oponentes.</p>
                </div>
                <div className="rule-box">
                    <h3>Regla 13</h3>
                    <p>Para dar inicio al turno de un jugador, se debe tirar el dado mediante el botón de la ventana de juego “tirar dado”. Una vez presionado se le entregará un número aleatorio entre 1 y 3, que indicará cuántas casillas puede moverse el usuario en el correspondiente turno.</p>
                </div>
            </div>

            <div className="rule-container">
                <h2 className="subtitle-rule">Fin del Juego</h2>
                <div className="rule-box">
                    <h3>Regla 15</h3>
                    <p>Gana el equipo pionero que primero obtenga 5 tesoros.</p>
                </div>
                <div className="rule-box">
                    <h3>Regla 16</h3>
                    <p>Si un jugador decide abandonar la partida, los demás jugadores podrán seguir jugando. En caso de que hayan solo dos jugaodres, el otro jugador gana automáticamente.</p>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Rules