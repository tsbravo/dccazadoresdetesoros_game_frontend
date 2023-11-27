import React, { useState, useEffect, useContext } from "react";
import NavBar from "../common/NavBar";
import './WaitingRoom.css';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import axios from "axios";
import Popup from "../common/popUp";
import API_URL from "../../config";

export default function WaitingRoom() {
    const [selectedMap, setSelectedMap] = useState(null);
    const [players, setPlayers] = useState([]);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [popupMsg, setPopupMsg] = useState('')

    const [errorState, setErrorState] = useState(true)
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const updatePlayerList = (mapType) => {
        axios.post(`${API_URL}/game`, {
            username: user.username,
            map_type: mapType
        })
        .then((response) => {
            const playerData = response.data;
            setPlayers([
                playerData.username_1,
                playerData.username_2,
                playerData.username_3,
                playerData.username_4
            ]);
        })
        .catch((error) => {
            console.log(error);
            setPopupMsg(
                <>
                <p>{error.response.data.detail}</p>
                </>
            )
            setIsOpenPopup(true)
        });
    };

    // useEffect(() => {
    //     if (selectedMap) {
    //         const interval = setInterval(() => {
    //             updatePlayerList();
    //         }, 10000); // Cada 5000 ms (5 segundos)

    //         return () => clearInterval(interval);
    //     }
    // }, [selectedMap, user]);

    const handleMapSelection = (mapNumber) => {
        setSelectedMap(mapNumber);
        updatePlayerList(mapNumber);
    };

    const startExpedition = () => {
        axios.post(`${API_URL}/game/create`, { 
            map_type: selectedMap, 
            username: user.username
        })
        .then((response) => {
            console.log(response.data.detail);
            if(response.data.detail === "Partida de juego creada con éxito") {
                setPopupMsg(
                    <>
                    <p>{response.data.detail}</p>
                    </>
                )
                setIsOpenPopup(true)
            }
            navigate(`/game/${selectedMap}/${user.username}`)
        })
        .catch((error) => {
            setPopupMsg(
                <>
                <p>{error.response.data.detail}</p>
                </>
            )
            setIsOpenPopup(true)
            console.log(error);
        })
    }

    const displayPlayers = () => {
        return players.map((player, index) => (
            player ? <p key={index} className="players-text">Jugador {index + 1}: {player}</p> : null
        ));
    };

    if (user !== null) {
        return (
            <div>
                <NavBar />
                {selectedMap && (
                    <div className="players-container">
                        <div className="text-players-container">
                            <h2 className="titulo-sala">Sala  de  Espera  para  el  Mapa  {selectedMap}</h2>
                            <p className="players-text-wait"> Esperando a que se unan más jugadores...</p>
                            {displayPlayers()}
                        </div>
                    </div>
                )}
                <div className={`selection-container ${selectedMap !== null ? 'ocultar-boton' : ''}`}>
                    <p id='texto-wait'>{selectedMap === null ? "Elige el mapa que quieres jugar:" : `Mapa escogido: Mapa ${selectedMap}`}</p>
                </div>
                {selectedMap === null && (
                    <div className="map-container">
                        <div className='mapa1'>
                            <button className='button-mapa1' onClick={() => handleMapSelection(1)}>
                                <img src="/imgs/mapa1.png" alt="" className='img1'/>
                            </button>
                            <p className="descripcion">Explora un mapa diverso con bosques mágicos, 
                            frescas cavernas de hielo y desiertos sofocantes.</p>
                        </div>
                        <div className='mapa2'>
                            <button className='button-mapa2' onClick={() => handleMapSelection(2)}>
                                <img src="/imgs/mapa2.png" alt="" className='img2'/>
                            </button>
                            <p className="descripcion">Navega por un mapa donde islas heladas, 
                            mares en furia y temibles volcanes te esperan en cada rincón.</p>
                        </div>
                    </div>
                )}
                <div className='div-botones-land'>
                    <button onClick={() => setSelectedMap(null)} className='boton-volver'>Atrás</button>
                    <button onClick={() => startExpedition()}
                            className={`boton-volver ${selectedMap !== null ? 'mostrar-boton' : 'ocultar-boton'}`}>
                            Continuar
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <NavBar />
                <div className='selection-container'>
                    <p id='texto-wait'>Debes iniciar sesión para poder entrar a un mapa de juego.</p>
                </div>
            </div>
        );
    }
}
