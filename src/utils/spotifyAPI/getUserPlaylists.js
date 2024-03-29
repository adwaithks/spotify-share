import { createResponse } from "../createResponse";

export async function getUserPlaylists(token) {
    let response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    let res;

    let data = await response.json();

    if (response.status != 200) 
        res = createResponse(response.status, data.error.message);
    else 
        res = createResponse(response.status, "", data);
    
    return res;
}