/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import './board.css';
import { UserContext } from "../../contexts/userContext";

let mapData = {};

// eslint-disable-next-line react/prop-types
export default function Board({ mapType }) {
    const [fichas, setFichas] = useState([
        { number: 1 },
        { number: 13 },
        { number: 105 },
        { number: 117 },
    ]);
    const [ gameId, setGameId ] = useState(0);
    const { user } = useContext(UserContext);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [currentTurn, setCurrentTurn] = useState('');

    useEffect(() => {
        const boardState = {
            fichas,
            // Agrega aquí otros estados que quieras guardar
        };
        localStorage.setItem('boardState', JSON.stringify(boardState));
    }, [fichas]); // Agrega aquí otros estados que quieras observar

    useEffect(() => {
        const savedBoardState = localStorage.getItem('boardState');
        if (savedBoardState) {
            const boardState = JSON.parse(savedBoardState);
            setFichas(boardState.fichas);
            // Establece aquí otros estados guardados
        }
    }, []);

    const clearBoardState = () => {
        localStorage.removeItem('boardState');
        // Aquí también puedes resetear los estados del componente si es necesario
    };

    // obtiene el gameId
    const savePosition = (position) => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/game/${user.username}`)
        .then((response) => {
            setGameId(response.data.game_id);
            const detail = response.data.detail;
            console.log(detail);
        })
        .catch((error) => {
            console.log(error);
        })
        // Revisa si la posición está bien
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/game/${gameId}/cell`, {
            position: position,
            user_id: user.id,
            game_id: gameId
        })
        .then((response) => {
            console.log(response.data.detail);
            setCurrentTurn(response.data.currentTurn)
        })
        .catch((error) => {
            console.log(error);
        });
    };

    // Cargar mapa
    useEffect(() => {
        if (!mapLoaded) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/map/${mapType}/load`)
            .then((response) => {
                mapData  = response.data.cells;
                setMapLoaded(true);
                Object.entries(mapData).forEach(([cellNumber, type]) => {
                    changeCellClass(cellNumber, type)
                });
                console.log("Map data:", mapData);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [mapLoaded, mapType]);

    return (
        <div className="board-container">
            {Array.from({ length: 9 }, (_, row) => (
                <div className={`hex-row-${row % 2 === 0 ? 1 : 2}`} key={row}>
                    {Array.from({ length: 13 }, (_, column) => {
                        const hexNumber = row * 13 + column + 1;
                        const index = fichas.findIndex((ficha) => ficha.number === hexNumber);
                        return (
                            <div
                                className={`hex ${
                                    fichas.some((ficha) => ficha.number === hexNumber) ? `ficha-jugador-${index + 1}` : ''
                                }`}
                                key={hexNumber}
                                id={`hex-${hexNumber}`}
                                onClick={() => savePosition(hexNumber)} //
                            ></div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export function changeCellClass(hexNumber, newClass) {
    const cell = document.getElementById(`hex-${hexNumber}`);
    if (cell) {
      cell.className = newClass;
    }
}

// position, `ficha-jugador-${index}`, index, map
export async function moveFicha(hexNumber, newClass, currentPlayer, map) {
    // Reestablecer celda de la ficha del jugador (celda antigua)
    const oldCells = document.getElementsByClassName(`ficha-jugador-${currentPlayer}`);
    for (const oldCell of Array.from(oldCells)) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/map/cell/type`, {
          cell: oldCell.id,
          mapType: map
        });
        oldCell.className = response.data.type;
      } catch (error) {
        console.log(error);
      }
    }
    // Actualizar ficha de la posición nueva
    const cell = document.getElementById(`hex-${hexNumber}`);
    if (cell) {
      cell.className = newClass;
    }
    const result = [cell, oldCells];
    return result;
  }

  // Función para restablecer el color de las celdas desbloqueadas
export function resetUnlockedCellsColor(mapData) {
    console.log('Restaurando celda')
    const classCells = document.getElementsByClassName('unlocked-cell');
    Array.from(classCells).forEach((cell) => {
      const cellNumber = parseInt(cell.id.replace('hex-', ''), 10);
      const cellColor = mapData[cellNumber];
      console.log('id celda', cellNumber)
      console.log('Color celda', cellColor)
      
      if (cellColor) {
        cell.className = cellColor;
      }
    });
}
