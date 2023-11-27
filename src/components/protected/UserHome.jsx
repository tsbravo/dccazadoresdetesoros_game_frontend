import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/userContext";

export default function UserHome(){
    const { token } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const [msg, setMsg] = useState(' ');
    
    const config = {
        'method': 'get',
        'url': `${import.meta.env.VITE_BACKEND_URL}/rutasprotegidas/protecteduser`,
        'headers': {
            'Authorization' : `Bearer ${token}`
        } 
    }

    useEffect(() => {
        axios(config).then((response) => {
            setMsg(`token ${token}, ${user}`)
        }).catch((err) => {
            setMsg("Token expirado o no estas logeado")
        })
    })

    return (
        <h1>
            {msg}
        </h1>
    )
}