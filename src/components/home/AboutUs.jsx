import NavBar from "../common/NavBar";
import './AboutUs.css'

export default function AboutUs() {
    return(
        <div>
            <div>
                <NavBar/>
            </div>
            <section className="about">
                <h1 className="title-about">Acerca del juego...</h1>
                <p className="body-about">
                    Nuestro juego busca el enfrentamiento entre bandas para alcanzar el descubrimiento de
                    los 5 tesoros escondidos en el letal Mapa de Juego. Con esta aventura multijugador, 
                    querrás pelear por el triunfo pase lo que pase. ¿Saldrá tu banda invicta, o 
                    habrán heridos en el camino? Averígualo adentrándote en la travesía de DCCazadores de tesoros.
                </p>
                <h1 className="subtitle-about">Nuestro equipo de trabajo</h1>

            <div className="container-fotos">
                <div className="card-container">
                    <img src="/imgs/trini.jpg" className="image" alt="foto_1"/>
                    <h3> Trinidad Sofía Bravo </h3>
                    <p className="card-text">Estudiante de tercer año de Ingeniería Civil, Major Ingeniería de Software, en la PUC.</p>
                </div>
                <div className="card-container">
                    <img src="/imgs/sofia.jpg" className="image" alt="foto_2"/>
                    <h3> Sofía Larraín </h3>
                    <p className="card-text">Estudiante de tercer año de Ingeniería Civil, Major Ingeniería de Software, en la PUC.</p>
                </div>
                <div className="card-container">
                    <img src="/imgs/eduardo.jpg" className="image" alt="foto_3"/>
                    <h3> Eduardo Salinas </h3>
                    <p className="card-text">Estudiante de tercer año de Ingeniería Civil, Major Ingeniería de Software, en la PUC.</p>
                </div>
            </div>
            </section>
        </div>
    )
}