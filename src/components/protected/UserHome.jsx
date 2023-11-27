import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/userContext";
import NavBar from "../common/NavBar";
import Popup from '../common/popUp';
import './UserHome.css'

export default function UserHome(){
    const { token } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const [msg, setMsg] = useState(' ');
    const [games, setGames] = useState([])
    const [waitRooms, setWaitRooms] = useState([])
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [popupMsg, setPopupMsg] = useState('')
    
    const config = {
        'method': 'get',
        'url': `${import.meta.env.VITE_BACKEND_URL}/rutasprotegidas/admin`,
        'headers': {
            'Authorization' : `Bearer ${token}`
        } 
    }

    const findGames = {
        'method': 'get',
        'url': `${import.meta.env.VITE_BACKEND_URL}/rutasprotegidas/games`,
        'headers': {
            'Authorization' : `Bearer ${token}`
        } 
    }

    const findWaitRooms = {
        'method': 'get',
        'url': `${import.meta.env.VITE_BACKEND_URL}/rutasprotegidas/waitrooms`,
        'headers': {
            'Authorization' : `Bearer ${token}`
        } 
    }




    useEffect(() => {
        axios(config).then((response) => {
            setMsg(`Bienvenido Admin!`)
        }).catch((err) => {
            setMsg("No eres admin")
        })

        axios(findGames).then((response) => {
            const formattedGames = response.data.games.map(item => item);

            setGames(formattedGames)
        }).catch((error) => {
            setPopupMsg(
                <>
                    <p>{error.response.data.detail}</p>
                </>)
            setIsOpenPopup(true)
        })
        axios(findWaitRooms).then((response) => {
            console.log(response)
            const formattedWaitRooms = response.data.WaitUsers.map(item => item);
            setWaitRooms(formattedWaitRooms);
        }).catch((error) => {
            setPopupMsg(
                <>
                    <p>{error.response.data.detail}</p>
                </>)
            setIsOpenPopup(true)
        })
    }, [])

    const deleteGame = (gameId) => {
        const deleteGameR = {
            'method': 'delete',
            'url': `${import.meta.env.VITE_BACKEND_URL}/rutasprotegidas/games/${gameId}`,
            'headers': {
                'Authorization' : `Bearer ${token}`
            } 
        }
        axios(deleteGameR).then((response) => {
            setPopupMsg(
                <>
                    <p>{response.data.detail}</p>
                </>
            )
        }).catch((error) => {
            setPopupMsg(
                <>
                    <p>{error.response.data.detail}</p>
                </>
            )
        });
    };

    const deleteWaitRoom = (waitId) => {
        const deleteWaitRoomR = {
            'method': 'delete',
            'url': `${import.meta.env.VITE_BACKEND_URL}/rutasprotegidas/waitrooms/${waitId}`,
            'headers': {
                'Authorization' : `Bearer ${token}`
            } 
        }
        axios(deleteWaitRoomR).then((response) => {
            setPopupMsg(
                <>
                    <p>{response.data.detail}</p>
                </>
            )
        }).catch((error) => {
            setPopupMsg(
                <>
                    <p>{error.response.data.detail}</p>
                </>
            )
        });
    };
    

    return (
        <div className="home-container1">
            <div>
                <Popup trigger={isOpenPopup} setTrigger={setIsOpenPopup}>
                    <h3>{popupMsg}</h3>
                </Popup>
            </div>
            <div>
                <NavBar/>
            </div>
            <div className="admin-container">
                <h1 className="texto-admin">
                    {msg}
                </h1>
            </div>
            <div className="games-waitrooms-wrapper">
                <div className="games-container">
                    {Array.isArray(games) && games.lenght > 0 ? games.map((game, index) => (
                        <div key={index}>
                            <h2>{game.id}</h2>
                            <h2>{game.totalPlayers}</h2>
                            <button className="boton-borrar" onClick={() => deleteGame(game.id)}>
                                Borrar juego
                            </button>
                        </div>
                    )) : (
                        <p>No hay juegos activos</p>
                    )}
                </div>
                <div className="waitrooms-container">
                    {Array.isArray(waitRooms) && waitRooms.length > 0 ? waitRooms.map((wait, index) => (
                        <div key={index}>
                            <h2>{wait.id}</h2>
                            <h2>{wait.mapType ? wait.mapType : 'Tipo de mapa no disponible'}</h2>
                            <button className="boton-borrar" onClick={() => deleteWaitRoom(wait.id)}>
                                Borrar sala de espera
                            </button>
                        </div>
                    )) : (
                        <p>No hay salas de espera activas</p>
                    )}
                </div>
            </div>
        </div>
    )
}