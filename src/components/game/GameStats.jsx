/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable react-refresh/only-export-components */
import React from "react";
import './GameStats.css';
import { UserContext } from "../../contexts/userContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Popup from "../common/popUp";
import PropTypes from 'prop-types';


export const data = {
  energia: {
    "Guerrero": 0,
    "Mago": 0,
    "Curandero": 0,
  },
  experiencia: 0,
  recursos: {
    "Fuego": 0,
    "Hielo": 0,
    "Agua": 0,
  },
  hechizos: {
    "Maldición de Experiencia": 0,
    "Éxtasis de Experiencia": 0,
    "Despojo de Recursos": 0,
  },
  pociones: {
    "Infusión de Revitalización": 0,
    "Poción de Renovación Total": 0,
    "Elixir de Protección": 0,
  },
};

export default function GameStats({
  userId,
  gameId,
  energia: energiaProp,
  experiencia,
  recursos: recursosProp,
  hechizos: hechizosProp,
  pociones: pocionesProp,
  tesoros,
  effect,
}) {  
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState('');
  const [idGame, setIdGame]  = useState(0);
  const { user } = useContext(UserContext);
  const [energia, setEnergia] = useState(energiaProp);
  const [recursos, setRecursos] = useState(recursosProp);
  const [hechizos, setHechizos] = useState(hechizosProp);
  const [pociones, setPociones] = useState(pocionesProp);

  useEffect(() => {
    const statsState = {
        energia,
        recursos,
        hechizos,
        pociones,
        // Otros estados relevantes
    };
    localStorage.setItem('statsState', JSON.stringify(statsState));
  }, [energia, recursos, hechizos, pociones]);

  useEffect(() => {
    const savedStatsState = localStorage.getItem('statsState');
    if (savedStatsState) {
        const statsState = JSON.parse(savedStatsState);
        setEnergia(statsState.energia);
        setRecursos(statsState.recursos);
        setHechizos(statsState.hechizos);
        setPociones(statsState.pociones);
        // Establece aquí otros estados guardados
    }
  }, []);

  const clearStatsState = () => {
    localStorage.removeItem('statsState');
    // Aquí también puedes resetear los estados del componente si es necesario
  };

  useEffect(() => {
    setIdGame(gameId);
  }, [gameId])

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/game/${gameId}/stats`, { 
      user_id: userId,
    })
    .then((response) => {
      setRecursos({
        'Fuego': response.data.fire,
        'Agua': response.data.water,
        'Hielo': response.data.ice,
      });
      setEnergia({
        'Guerrero': response.data.warrior_energy,
        'Curandero': response.data.healer_energy,
        'Mago': response.data.wizard_energy,
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }, [pociones, hechizos, gameId, userId, effect])

  // Crear Pociones
  const togglePotions = (type) => {
    if (userId != 0 && idGame != 0){
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/game/${idGame}/potion`, {
        user_id: userId,
        potion: type
      })
      .then(response => {
        setPociones(prevPociones => ({
          ...prevPociones,
          [response.data.name]: response.data.potions
        }));
        setPopupMsg(
          <>
            <p>{response.data.detail}</p>
          </>
        )
        setIsOpenPopup(true);
      })
      .catch(error => {
        setPopupMsg(
          <>
            <p>{error.response.data.detail}</p>
          </>
        )
        setIsOpenPopup(true);
      });
    }
  };

  // Crear hechizos
  const toggleSpells = (type) => {
    if (userId != 0 && idGame != 0){
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/game/${idGame}/spell`, {
        user_id: userId,
        spell: type
        
      })
      .then(response => {
        setHechizos(prevHechizos => ({
          ...prevHechizos,
          [response.data.name]: response.data.spells
        }));
        setPopupMsg(
          <>
            <p>{response.data.detail}</p>
          </>
        )
        setIsOpenPopup(true);
      })
      .catch(error => {
        setPopupMsg(
          <>
            <p>{error.response.data.detail}</p>
          </>
        )
        setIsOpenPopup(true);
      });
    }
  };

  // Usar Pociones
  const utilizePotions = (type) => {
    if (userId != 0 && idGame != 0){
      if (type === 'Infusión de Revitalización' || type === 'Poción de Renovación Total') {
        setPopupMsg(
          <>
            <p>Elige un miembro de tu equipo para beneficiar:</p>
            <div className="buttons-popup">
              <button onClick={() => handleMemberClick('warrior', type)} className="popup-button">Guerrero</button>
              <button onClick={() => handleMemberClick('healer', type)} className="popup-button">Curandero</button>
              <button onClick={() => handleMemberClick('wizard', type)} className="popup-button">Mago</button>
            </div>
          </>
        )
        setIsOpenPopup(true);
      } else if (type === 'Elixir de Protección') {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/game/${gameId}/potion/use`, { 
          user_id: userId,
          potion: type,
        })
        .then((response) => {
          setPociones(prevPociones => ({
            ...prevPociones,
            [response.data.name]: response.data.potions
          }));
          setPopupMsg(
            <>
              <p>{response.data.detail}</p>
            </>
          )
          setIsOpenPopup(true)
        })
        .catch((error) => {
          console.log(error);
          setPopupMsg(
            <>
              <p>{error.response.data.detail}</p>
            </>
          )
          setIsOpenPopup(true)
        })
      }
    }
  }

  // Usar Hechizos NO LISTO
  const utilizeSpells = (type) => {
    if (userId != 0 && idGame != 0){
      if (type === "Éxtasis de Experiencia" || type === "Despojo de Recursos") {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/game/${gameId}/spell/use`, { 
          user_id: userId,
          spell: type,
        })
        .then((response) => {
          setHechizos(prevHechizos => ({
            ...prevHechizos,
            [response.data.name]: response.data.spells
          }));
          setPopupMsg(
            <>
              <p>{response.data.detail}</p>
            </>
          )
          setIsOpenPopup(true)
        })
        .catch((error) => {
          console.log(error);
          setPopupMsg(
            <>
              <p>{error.response.data.detail}</p>
            </>
          )
          setIsOpenPopup(true)
        })
      } else if (type === "Maldición de Experiencia") {
        setPopupMsg(
          <>
            <p>Elige un oponente para enviarle una maldición:</p>
            {Object.entries(tesoros).map(([usuario]) => (
              usuario !== user.username && (
                <div className="buttons-popup">
                  <button key={usuario} onClick={() => handleOpponentClick(usuario, type)} className="popup-button">
                  {usuario}
                  </button>
                </div>
              )
            ))}
          </>
        )
        setIsOpenPopup(true);
      }
    }
  }

  const handleMemberClick = (member, potion) => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/game/${gameId}/potion/use`, { 
      user_id: userId,
      potion: potion,
      member: member,
    })
    .then((response) => {
      setPociones(prevPociones => ({
        ...prevPociones,
        [response.data.name]: response.data.potions
      }));
      setPopupMsg(
        <>
          <p>{response.data.detail}</p>
        </>
      )
      setIsOpenPopup(true)
    })
    .catch((error) => {
      console.log(error);
      setPopupMsg(
        <>
          <p>{error.response.data.detail}</p>
        </>
      )
      setIsOpenPopup(true)
    })
  };

  const handleOpponentClick = (opponent, spell) => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/game/${gameId}/spell/use`, { 
      user_id: userId,
      spell: spell,
      opponent: opponent,
    })
    .then((response) => {
      setHechizos(prevHechizos => ({
        ...prevHechizos,
        [response.data.name]: response.data.spells
      }));
      setPopupMsg(
        <>
          <p>{response.data.detail}</p>
        </>
      )
      setIsOpenPopup(true)
    })
    .catch((error) => {
      console.log(error);
      setPopupMsg(
        <>
          <p>{error.response.data.detail}</p>
        </>
      )
      setIsOpenPopup(true)
    })
  };

  return (
    <div>
    <div>
      <Popup trigger={isOpenPopup} setTrigger={setIsOpenPopup}>
        <h3>{popupMsg}</h3>
      </Popup>
    </div>
    <div className="panel-container">
      <div className="tesoro-container">
        <h2>Tesoros</h2>
        {Object.entries(tesoros).map(([usuario, cantidad], index) => (
          <div className="linea-boton">
            <div className={`ficha-color-${index + 1}`}></div>
            <h4 key={tesoros}>{usuario}: {cantidad}</h4>
          </div>
        ))}
      </div>

      <div className="general-container">
        <div className="energia-container">
          <h2>Energía</h2>
          {Object.entries(energia).map(([guerrero, cantidad]) => (
            <h4 key={guerrero}>{guerrero}: {cantidad}</h4>
          ))}
        </div>
        <div className="columna-energia">
          <div className="experiencia-container">
            <h2>Experiencia: {experiencia}</h2>
          </div>
          <div className="recursos-container">
            <h2>Recursos</h2>
            {Object.entries(recursos).map(([recurso, cantidad]) => (
              <h4 key={recurso}>{recurso}: {cantidad}</h4>
            ))}
          </div>
        </div>
      </div>

      <div className="hechizos-container">
        <h2>Hechizos</h2>
        <div className="columnas-container">
          <div className="columna">
            {Object.entries(hechizos).map(([hechizo, cantidad]) => (
              <div className="linea-boton">
                <h4 key={hechizo}>{hechizo}: {cantidad}</h4>
              </div>
            ))}
          </div>
          <div className="columna">
            {Object.entries(hechizos).map(([hechizo]) => (
              <div className="linea-boton">
                <button className="button-creacion" onClick={() => utilizeSpells(hechizo)}> Usar</button> 
                <button className="button-creacion" onClick={() => toggleSpells(hechizo)}> Crear</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pociones-container">
        <h2>Pociones</h2>
        <div className="columnas-container">
          <div className="columna">
            {Object.entries(pociones).map(([pocion, cantidad]) => (
              <div className="linea-boton">
                <h4 key={pocion}>{pocion}: {cantidad}</h4>
              </div>
            ))}
          </div>
          <div className="columna">
            {Object.entries(pociones).map(([pocion]) => (
              <div className="linea-boton">
                <button className="button-creacion" onClick={() => utilizePotions(pocion)}> Usar</button> 
                <button className="button-creacion" onClick={() => togglePotions(pocion)}> Crear</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );

  // eslint-disable-next-line no-unreachable
  GameStats.propTypes = {
    userId: PropTypes.number.isRequired,
    gameId: PropTypes.number.isRequired,
    energia: PropTypes.object.isRequired,
    experiencia: PropTypes.number.isRequired,
    recursos: PropTypes.object.isRequired,
    hechizos: PropTypes.object.isRequired,
    pociones: PropTypes.object.isRequired,
    tesoros: PropTypes.array.isRequired,
  }
}
