import React,{ createContext } from "react";

export const playlistsContext = createContext();

export function PlaylistsProvider({children}) {

    const [playlists, setPlaylists] = React.useState([]);

    return (
        <playlistsContext.Provider value={{playlists, setPlaylists}}>
            {children}
        </playlistsContext.Provider>
    )
}
