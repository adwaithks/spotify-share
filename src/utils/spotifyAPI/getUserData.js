export async function getUserData(token) {
    let response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    let data = await response.json();
    return data;
}