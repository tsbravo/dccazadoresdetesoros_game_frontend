import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Rules from './home/rules';
import Home from './home/Home';
import Register from './home/Register';
import Login from './home/Login';
import Game from './game/game';
import AboutUs from './home/AboutUs';
import WaitingRoom from './game/WaitingRoom';
import UserProvider from '../contexts/userContext';
import UserHome from './protected/UserHome';

export default function Routing() {
    return (
        <>
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={'/rules'} element={<Rules/>}/>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path="/game/:map/:username" element={<Game />} />
                    <Route path={'/about'} element={<AboutUs/>}/>
                    <Route path={'/waitingroom'} element={<WaitingRoom/>}/>
                    <Route path={'/dashboard'} element={<UserHome/>}/>
                </Routes>
            </BrowserRouter>  
        </UserProvider>
        </>
    )
}
