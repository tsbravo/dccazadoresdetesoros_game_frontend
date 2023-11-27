/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export default function UserProvider({ children }) {
    // Fetch user data from local storage if it exists
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            // Optionally, fetch additional user data from backend using the token if needed
        } else {
            localStorage.removeItem("token");
            setUser(null); // Clear user data if there's no token
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    function logout() {
        setToken(null);
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken, logout }}>
            {children}
        </UserContext.Provider>
    );
}