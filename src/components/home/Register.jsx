import NavBar from "../common/NavBar";
import './Register.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import React, { useState } from 'react'
import Popup from '../common/popUp'
import API_URL from "../../config";

export default function Register() {

    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const [popupMsg, setPopupMsg] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            username: event.target.username.value,
            isAdmin: false,
            email: event.target.email.value,
            password: event.target.password.value,
        }
        axios.post(`${API_URL}/register`, data)
            .then(res => {
                handleRouteChange()
            }).catch(err => {
                setPopupMsg(
                    <>
                    <p>{err.response.data.detail}</p>
                    </>
                )
                setIsOpenPopup(true)
                console.log(err)
            })
    };



    const navigate = useNavigate();

    const handleRouteChange = () => {
        navigate('/')
    }

    

    return (
        <div>
            <div>
                <NavBar/>
            </div>
            <div>
                <Popup trigger={isOpenPopup} setTrigger={setIsOpenPopup}>
                    <h3>{popupMsg}</h3>
                </Popup>
            </div>
            <section className="register-container">
                <div className='container-register-2'>
                    <form onSubmit={handleSubmit}>
                        <fieldset className="fieldset-register">
                            <legend className='texto'>Registro de usuario</legend>
                            <div className="form-row">
                                <input type='text' id='username' name='username' placeholder='Nombre de usuario' required/>
                            </div>
                            <div className="form-row">
                                <input type='email' id='email' name='email' placeholder='Correo electrónico' required/>
                            </div>
                            <div className="form-row">
                                <input type='password' id='password' name='password' placeholder='Contraseña' required/>
                            </div>
                            <div className="form-row">
                                <input type='password' id='password2' name='password2' placeholder='Repetir contraseña' required/>
                            </div>
                            <div className="form-row">
                                <input className='button' type='submit' value='Registrarse'/>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </section>
        </div>
    )
}