import { UserContext } from '../../contexts/userContext';
import React, { useContext } from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    const { user, logout } = useContext(UserContext);

    const handleLogout = () => {
        logout();
    };

    const getNavLinkClass = (path) => {
        return ({ isActive }) => isActive ? `nav-item active` : 'nav-item';
    };

    return (
        <div className='nav-main'>
            <div className="g-izquierda">
                <NavLink to="/" className={getNavLinkClass("/")}>
                    <div id="letras-logo">
                        DCCazadores de tesoros
                    </div>
                </NavLink>
            </div>
            <div className="g-derecha">
                <NavLink to="/rules" className={getNavLinkClass("/rules")}>
                    <div id="item">
                        Reglas
                    </div>
                </NavLink>
                <NavLink to="/about" className={getNavLinkClass("/about")}>
                    <div id="item">
                        Sobre nosotros
                    </div>
                </NavLink>
                {!user && (
                    <NavLink to="/register" className={getNavLinkClass("/register")}>
                        <div id="item">
                            Regístrate
                        </div>
                    </NavLink>
                )}
                {!user && (
                    <NavLink to="/login" className={getNavLinkClass("/login")}>
                        <div id="item">
                            Iniciar sesión
                        </div>
                    </NavLink>
                )}
                {user && (
                    <NavLink to="/" className={getNavLinkClass("/")} onClick={handleLogout}>
                        <div id="item">
                            {user.username}
                        </div>
                    </NavLink>
                )}
            </div>
        </div>
    );
}