import React from "react";
import { userContext } from "../context/userContext";

export function useClearUser() {
    const {setUser} = React.useContext(userContext);
    window.localStorage.removeItem('user');
    setUser({
        token: "",
        isLoggedIn: false,
        name: "",
        imageUrl: ""
    });
}