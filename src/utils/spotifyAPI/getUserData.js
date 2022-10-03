import { createResponse } from '../createResponse';

export async function getUserData(token) {
    let response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    let res;

    let data = await response.json();

    console.log(data);

    if (response.status != 200) 
        res = createResponse(response.status, data.error.message);
    else {
        res = createResponse(response.status, "", data);
    }
    
    return res;
}