import { useState } from "react";

export default function UserWelcome() {

    const [nombre, setNombre] = useState(null);

    function handleChange(nombre) {
        setNombre(nombre);
    }

    return (
        <>
        <h2>Primer componente</h2>
        <input
            onChange={e => handleChange(e.target.value)}
        />
        <p>Bienvenid@, {nombre}!</p>
        </>
    )
}