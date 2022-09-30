import React,{ createContext } from "react";

export const authModalVisibilityContext = createContext();

export function AuthModalVisibilityProvider({children}) {

    const [authModalIsOpen, setAuthModalIsOpen] = React.useState(false);

    return (
        <authModalVisibilityContext.Provider value={{authModalIsOpen, setAuthModalIsOpen}}>
            {children}
        </authModalVisibilityContext.Provider>
    )
}
