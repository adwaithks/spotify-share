export async function getUserPlaylists(token) {
    let response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    let data = await response.json();
    return data;
}