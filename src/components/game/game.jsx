import './game.css';
import NavBar from "../common/NavBar";
import Board from "./board";
import { moveFicha, resetUnlockedCellsColor } from "./board";
import GameStats from "./GameStats";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { UserContext } from "../../contexts/userContext";
import { useContext, useEffect } from "react";
import axios from 'axios';
import { changeCellClass } from "./board";
import Popup from '../common/popUp';
import { data } from "./GameStats";
import API_URL from '../../config';

function Game() {
    
    const [currentPlayer, setCurrentPlayer] = useState('');
    const { map } = useParams();
    const [unlockedCells, setUnlockedCells] = useState([]);
    const { user } = useContext(UserContext);
    const [gameId, setGameId] = useState(0);
    const [userId, setUserId] = useState(0);
    const [playerPositions, setPlayerPositions] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [numMoves, setNumMoves] = useState(0);
    const [effect, setEffect] = useState(0);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [popupMsg, setPopupMsg] = useState('')
    const [fichas, setFichas] = useState([
        { number: 1 },
        { number: 13 },
        { number: 105 },
        { number: 117 },
    ]);
    const navigate = useNavigate();
    const [playerExperience, setPlayerExperience] = useState(data.experiencia);
    const [playerResources, setPlayerResources] = useState(data.recursos);
    const [playerEnergy, setPlayerEnergy] = useState(data.energia);
    const [playerTreasures, setPlayerTreasures] = useState([]);
    const [playerPotions, setPlayerPotions] = useState(data.pociones);
    const [playerSpells, setPlayerSpells] = useState(data.hechizos);
    const [chosenResource, setChosenResource] = useState('');
    const [mapData, setMapData] = useState({});

    useEffect(() => {
        const gameState = {
            currentPlayer,
            playerPositions,
            fichas,
            // Agrega aquí otros estados que quieras guardar
        };
        localStorage.setItem('gameState', JSON.stringify(gameState));
    }, [currentPlayer, playerPositions, fichas]);

    useEffect(() => {
        const savedGameState = localStorage.getItem('gameState');
        if (savedGameState) {
            const gameState = JSON.parse(savedGameState);
            setCurrentPlayer(gameState.currentPlayer);
            setPlayerPositions(gameState.playerPositions);
            setFichas(gameState.fichas);
            // Establece aquí otros estados guardados
        }
    }, []);

    const clearGameState = () => {
        localStorage.removeItem('gameState');
        // Aquí también puedes resetear los estados del componente si es necesario
    };
    // Obtener game id, user id, actualizar recursos iniciales
    useEffect(() => {
        axios.get(`${API_URL}/game/${user.username}`)
        .then((response) => {
            setUserId(response.data.user_id);
            setGameId(response.data.game_id);
            const detail = response.data.detail;
            console.log(detail);
        })
        .catch((error) => {
            console.log(error)
        })
        axios.get(`${API_URL}/game/${gameId}/show`)
        .then((response) => {
            const allPlayersTreasures = response.data.treasures;
            setPlayerTreasures(allPlayersTreasures);
        })
        axios.post(`${API_URL}/game/resources`, {
            user_id: userId
        })
        .then((response) => {
            console.log(response.data)
            setPlayerEnergy({
                'Guerrero': response.data.warriorEnergy,
                'Curandero': response.data.healerEnergy,
                'Mago': response.data.wizardEnergy,
            });
            setPlayerResources({
                "Fuego": response.data.fire,
                "Agua": response.data.water,
                "Hielo": response.data.ice,
            });
            setPlayerExperience(response.data.experience);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    // Obtener actualización juego (jugador actual y posiciones de los jugadores)
    useEffect(() => {
        axios.get(`${API_URL}/game/${gameId}/show`)
        .then((response) => {
            setCurrentPlayer(response.data.turn);
            const positions = response.data.positions;
            setPlayerPositions(positions);

            let index = 1;

            index = 1;
            positions.forEach((position) => {
                moveFicha(position, `ficha-jugador-${index}`, index, map, mapData);
                index += 1;
            });
        })
        .catch((error) => {
            setPopupMsg(
                <>
                {error.response.data.detail === 'Partida terminada' && (
                    <>
                        <p>Partida terminada</p>
                        <p>El jugador {error.response.data.winner} ha ganado</p>
                    </>
                )}
                </>
            )
            if (error.response.data.detail === 'Partida terminada') {
                setIsOpenPopup(true);
            }
            console.log(error);
        })
    }, [effect, gameId, map, mapData]);

    // Obtener nombres de usuarios
    useEffect(() => {
        axios.get(`${API_URL}/users/${map}/usernames`)
        .then((response) => {
            console.log(response.data.usernames)
            if(response.data.usernames.length >= 2){
                setIsButtonDisabled(false)
            }
            const detail = response.data.detail;
            console.log(detail);
        })
        .catch((error) => {
            console.log(error)
        })
        axios.get(`${API_URL}/map/${map}/load`)
            .then((response) => {
                setMapData(response.data.cells);
                Object.entries(mapData).forEach(([cellNumber, type]) => {
                    changeCellClass(cellNumber, type)
                });
                console.log("Map data:", map);
            })
            .catch((error) => {
                console.log(error);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        unlockedCells.forEach(cell => {
            changeCellClass(cell, 'unlocked-cell');
        });
    }, [unlockedCells]);

    useEffect(() => {
        const updatedFichas = [...fichas];
        playerPositions.forEach((position, index) => {
            updatedFichas[index].number = position;
        });
        setFichas(updatedFichas);
    }, [fichas, playerPositions]);

    const handleResourceClick = (resourceType) => {
        setChosenResource(resourceType);
    };

    useEffect(() => {
        console.log('Recurso actualizado:', chosenResource);
        axios.post(`${API_URL}/game/${gameId}/confrontation`, { 
            user_id: userId,
            resource: chosenResource,
        })
        .then((response) => {
            setPopupMsg(
                <>
                <p>{response.data.detail}</p>
                </>
            )
            setIsOpenPopup(true)
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setChosenResource('');
        });
    }, [chosenResource, gameId, userId]);

    const togglePlayer = () => {
        // setEffect(prevEffect => prevEffect + 1);
        try {
            // Actualizar información juego
            axios.get(`${API_URL}/game/${gameId}/show`)
            .then((response) => {
                const allPlayersTreasures = response.data.treasures;
                setPlayerTreasures(allPlayersTreasures);
            })

            // Mandar nueva posición
            axios.post(`${API_URL}/game/${gameId}/move`, {
                movements: numMoves,
                user_id: userId
            })
            .then((response) => {
                setPopupMsg(
                    <>
                    <p>Posición actualizada!</p>
                    <p>En la nueva casilla encontraste:</p>
                    <p>Recursos: {response.data.resource}</p>
                    <p>Energía: {response.data.energy ? 'Ganaste 1 de energía para tu ' + response.data.member_energy.type : '0'}</p>
                    <p>Experiencia: {response.data.experience ? '1' : '0'}</p>
                    <p>Amenaza: {response.data.threat}</p>
                    {response.data.threat !== 'No hay amenazas' && (
                        <>
                        <p>Oh no!! Un {response.data.threat} te ha quitado energía.</p>
                        <p>Miembro del equipo afectado: {response.data.member_affected.type}</p>
                        </>
                    )}
                    <p>Tesoro: {response.data.treasure ? 'Encontraste un tesoro!' : 'No habían tesoros.'}</p>
                    {response.data.confrontation && (
                        <>
                            <p>¡Has iniciado un enfrentamiento con {response.data.opponent}!</p>
                            <p>Elige un recurso para utilizar en el enfrentamiento:</p>
                            <div className="buttons-popup">
                                <button className="popup-button" onClick={() => handleResourceClick('fire')}>Fuego</button>
                                <button className="popup-button" onClick={() => handleResourceClick('water')}>Agua</button>
                                <button className="popup-button" onClick={() => handleResourceClick('ice')}>Hielo</button>
                            </div>
                        </>
                    )}
                    {response.data.is_winner && (
                        <>
                        <p>¡Felicitaciones! Has ganado la expedición</p>
                    </>
                    )}
                    </>
                )
                setEffect(prevEffect => prevEffect + 1);
                resetUnlockedCellsColor(mapData);
                setIsOpenPopup(true)
                console.log(response.data.detail);
            })
            .catch((error) => {
                setPopupMsg(
                    <>
                    <p>{error.response.data.detail}</p>
                    </>
                )
                setIsOpenPopup(true)
                console.log(error);
                console.log(error.response.data.detail);
            })

            // Actualizar stats jugador
            // axios.post(`${API_URL}/game/${gameId}/stats`, { 
            //     user_id: userId,
            // })
            // .then((response) => {
            //     setPlayerResources({
            //         'Fuego': response.data.fire,
            //         'Agua': response.data.water,
            //         'Hielo': response.data.ice,
            //     });
            //     setPlayerEnergy({
            //         'Guerrero': response.data.warrior_energy,
            //         'Curandero': response.data.healer_energy,
            //         'Mago': response.data.wizard_energy,
            //     });
            //     setPlayerExperience(response.data.experience);
            //     setPlayerPotions(response.data.potions);
            //     setPlayerSpells(response.data.spells);
            // })
            // .catch((error) => {
            //     console.log(error);
            // })
        } catch (error) {
            console.error(error);
        }
    }

    const generatePopupMessage = (resultConfrontation, opponentUsername) => {
        let popupMsg = null;
    
        if (resultConfrontation === 'won') {
            popupMsg = (
                <>
                    <p>El enfrentamiento contra {opponentUsername} ha terminado</p>
                    <p>¡Has ganado!</p>
                </>
            );
        } else if (resultConfrontation === 'loss') {
            popupMsg = (
                <>
                    <p>El enfrentamiento contra {opponentUsername} ha terminado</p>
                    <p>¡Has perdido!</p>
                </>
            );
        } else if (resultConfrontation === 'drawn') {
            popupMsg = (
                <>
                    <p>El enfrentamiento contra {opponentUsername} ha terminado</p>
                    <p>¡Han empatado!</p>
                </>
            );
        }
        return popupMsg;
    };

    // Tirar dado
    const throwDice = () => {
        axios.post(`${API_URL}/game/${gameId}/dice`, { 
            user_id: userId 
        })
        .then((response) => {
            resetUnlockedCellsColor(mapData);
            setEffect(prevEffect => prevEffect + 1);
            setNumMoves(response.data.num_movements);
            setUnlockedCells(response.data.unlocked_cells);
            setPopupMsg(
                <>
                {response.data.pending_confrontation && (
                    <>
                        <p>¡El jugador {response.data.opponent} te ha retado a un enfrentamiento!</p>
                        <p>Elige un recurso para utilizar en el enfrentamiento:</p>
                        <button onClick={() => handleResourceClick('fire')}>Fuego</button>
                        <button onClick={() => handleResourceClick('water')}>Agua</button>
                        <button onClick={() => handleResourceClick('ice')}>Hielo</button>
                    </>
                )}
                {response.data.winner_exists && (
                    <>
                    <p>El juego ha terminado</p>
                    <p>¡El jugador {response.data.winner_username} ha ganado la Expedición!</p>
                </>
                )}
                </>
            )
            if (response.data.pending_confrontation) {
                setIsOpenPopup(true);
            }
            if (response.data.pending_confrontation_notification) {
                const resultConfrontation = response.data.result_confrontation;
                const opponentUsername = response.data.opponent_username;
                const popUpMessage = generatePopupMessage(resultConfrontation, opponentUsername);
                setPopupMsg(popUpMessage);
                setIsOpenPopup(true);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const exitGame = () => {
        navigate('/');
        axios.post(`${API_URL}/game/${gameId}/exit`, { 
            user_id: userId 
        })
        .then((response) => {
            clearGameState()
            setPopupMsg(
                <>
                <p>{response.data.detail}</p>
                </>
            )
            setIsOpenPopup(true)
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
      };

    return (
        <div>
            <NavBar />
            <div className="game-container">
                <div className="board">
                    <div className="titulo">
                        <h2>Turno de: {currentPlayer}</h2>
                        <h2>Moves: {numMoves}</h2>
                    </div>
                    <Popup trigger={isOpenPopup} setTrigger={setIsOpenPopup}>
                        <h3>{popupMsg}</h3>
                    </Popup>
                    <Board mapType={map}/>
                    <div className="layout-botones">
                        <div className="foto-dado"></div>
                        <button className="button-juego" onClick={throwDice}>Tirar dado</button>
                        <button className="button-juego" onClick={togglePlayer}>Terminar Turno</button>
                        <button className="button-juego" onClick={exitGame}>Abandonar partida</button>
                        
                    </div>
                    <div className="mensaje">
                        {/* <h3>Mensaje : {message}</h3> */}
                    </div>
                </div>
                <div className="panel">
                    <div className="titulo">
                        <h2>Panel de Juego</h2>
                    </div>
                    <GameStats
                        userId={userId}
                        gameId={gameId}
                        energia={playerEnergy}
                        experiencia={playerExperience}
                        recursos={playerResources}
                        hechizos={playerSpells}
                        pociones={playerPotions}
                        tesoros={playerTreasures}
                        effect={effect}
                    />
                </div>
            </div>
        </div>
    );
}

export default Game