import NavBar from "../common/NavBar";
import './Home.css'
import { useNavigate } from "react-router-dom";
// import '../../assets/fonts/enchanted_land/Enchanted-Land.ttf';

export default function Home() {
    const navigate = useNavigate();

    const navigateToGame = () => {
        navigate('/waitingroom');
      };

    // const {user} = useContext(UserContext)

    return (
        <div>
            <div>
                <NavBar/>
            </div>
            <h1 className="main-title-land">¡Bienvenido/a a DCCazadores de tesoros!</h1>
            <div className='home-container'>
                
                <div className='container-1-land'>
                    <h2 className="container1-text">Sobre el juego...</h2>
                    <div id="body-text">
                        <h3>
                            1- Cada equipo posee su banda de hechizeros, guerreros y magos.
                        </h3>
                        <h3>
                            2- Las bandas pelean por ser la primera en encontrar 5 tesoros.
                        </h3>
                        <h3>
                            3- En el proceso de búsqueda, cada banda debe enfrentarse en combate y generar pociones y hechizos para alejar a su enemigo.
                        </h3>
                        <h3>
                            4- Este juego en línea es perfecto para adentrarte en un mundo fantástico con criaturas, 
                            enemigos y batallas campales. Es perfecto para compartir con amigos!
                        </h3>
                    </div>
                </div>
                <div className='container-2-land'>
                    <div className="mago-texto-land">
                        <p className='container2-text'>¡Ven a luchar por el prestigio de tu banda!</p>
                        <img src="/imgs/mago.png" className="container2-img" alt="mago"/>
                        <button className="button-mago" onClick={navigateToGame}>Comenzar aventura</button>
                    </div>
                </div>
            </div>
        </div>
    )
}