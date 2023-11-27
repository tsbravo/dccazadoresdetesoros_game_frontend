import {useState} from "react"
import './DropDown.css'
// import axios from "axios";

export default function DropDown(){
    const [selectedValue, setSelectedValue] = useState();

    const handleChange = (event) => {
        // axios.post(`${import.meta.env.VITE_BACKEND_URL}/game`, {
           //  username: 
        // })
        setSelectedValue(event.target.value);
        
    };

    return(
        <div>
            <select value={selectedValue} onChange={handleChange} className="select-menu">
                <option value="1">Mapa 1</option>
                <option value="2">Mapa 2</option>
            </select>
        </div>
    )
}
