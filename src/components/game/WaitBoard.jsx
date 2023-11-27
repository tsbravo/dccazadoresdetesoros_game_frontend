/* eslint-disable react/prop-types */

import {useNavigate} from 'react-router-dom'
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { UserContext } from '../../contexts/userContext';

export default function WaitBoard({ map }) {

    const { user } = useContext(UserContext);

    const [usernamePlayer1, setUsernamePlayer1] = useState("");
    const [usernamePlayer2, setUsernamePlayer2] = useState("");
    const [usernamePlayer3, setUsernamePlayer3] = useState("");
    const [usernamePlayer4, setUsernamePlayer4] = useState("");
    const [isLoading, setIsLoading] = useState(true)

    // useEffect(() => {
    //     if (user){
    //         axios.get(`${import.meta.env.VITE_BACKEND_URL}/waitingroom/${map}/${user.username}`)
    //         .then((response) => {
    //             const data = response.data[0];
    //             setUsernamePlayer1(data.username_1);
    //             setUsernamePlayer2(data.username_2);
    //             setUsernamePlayer3(data.username_3);
    //             setUsernamePlayer4(data.username_4);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })}else{
    //             console.log("Inicia sesión o regístrate para jugar");
    //         }
    // }, [map, user]);
    

    const navigate = useNavigate();

    // const navigateToGame = () => {
    //     navigate(`/game/${map}`);
    // }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return(
        <div>
            <div className="wait-board">
                <div className="wait-board-text">
                    <h2 className='text'>¿Listo para jugar, {user.username}?</h2>
                    <h3 className='text'>Mapa {map}</h3>
                </div>
                <div className='names-container'>
                    <ol className='names'>
                        <li>{usernamePlayer1}</li>
                        <li>{usernamePlayer2}</li>
                        <li>{usernamePlayer3}</li>
                        <li>{usernamePlayer4}</li>
                    </ol>
                </div>
                <div className="wait-container">
                    <div>
                        <p className='descripcion'>Esperando a que se unan más jugadores...</p>
                    </div>
                    <div className='spinner'>
                    </div>
                </div>
            </div>
            <div>
                <button className='boton-continuar'>¡A jugar!</button>
            </div>
        </div>
    );
}