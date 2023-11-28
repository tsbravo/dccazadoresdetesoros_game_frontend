import NavBar from "../common/NavBar";
import './Login.css'
import React, { useState, useContext } from 'react';
import { UserContext } from "../../contexts/userContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Popup from '../common/popUp';
import API_URL from "../../config";


export default function Login() {

    const { token, setToken } = useContext(UserContext);

    const {setUser} = useContext(UserContext);

    const navigate = useNavigate();

    const [data, setData] = useState({
        username: '',
        isAdmin: '',
        email: '',
    });

    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const [popupMsg, setPopupMsg] = useState('')

    const [response, setResponse] = useState(null)

    const handleInputChange = (event) => {
        // const {name, value} = event.target; para entender mejor
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleRouteChange = () => {
        navigate('/')
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${API_URL}/login`, data)
            .then(res => {
                console.log(res.data)
                const accessToken = res.data.access_token;
                const user = res.data.user.username;
                setToken(accessToken)
                // localStorage.setItem("token",token);
                setUser(res.data.user)
                handleRouteChange()
            }).catch(err => {
                setPopupMsg(
                    <>
                    <p>{err.response.data.detail}</p>
                    </>
                )
                setIsOpenPopup(true)
                console.log(err.response.data.detail)
            })
    }

    return(
        <div>
            <div>
                <NavBar/>
            </div>
            <div>
                <Popup trigger={isOpenPopup} setTrigger={setIsOpenPopup}>
                    <h3>{popupMsg}</h3>
                </Popup>
            </div>
            <section className="login-container">
                <div className='container-principal'>
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend className='texto'>Inicio de sesión</legend>
                            <div className="form-row">
                                <input type='text' id='username' name='username' placeholder='Nombre de usuario' onChange={handleInputChange} required/>
                            </div>
                            <div className="form-row">
                                <input type='password' id='password' name='password' placeholder='Contraseña' onChange={handleInputChange} required/>
                            </div>
                            <div className="form-row">
                                <input className='button' type='submit' value='Iniciar sesión'/>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </section>
        </div>
    )
}