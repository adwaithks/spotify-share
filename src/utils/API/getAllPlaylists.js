import { createResponse } from "../createResponse.js";
import {URLS} from "../urls.js";

export async function getAllPlaylists() {
    const response = await fetch(URLS.BASE_URL + '/api/playlist/all', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    let res;

    if (response.status != 200)
        res = createResponse(response.status, "", data.error.message);
    else
        res = createResponse(response.status, "", data.data);

    return res;
}