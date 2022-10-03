import React, { createContext } from "react";

export const userContext = createContext();

export function UserProvider({children}) {

    const [user, setUser] = React.useState(JSON.parse(window.localStorage.getItem('user')) || {
        token: "",
        email: "",
        userUrl: "",
        isLoggedIn: false,
        name: "",
        imageUrl: ""
    });

    console.log(user);

    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}