import { URLS } from "./urls";

export function getSpotifyAuthUrl() {
    const authUrl = 'https://accounts.spotify.com/authorize';
    const redirectUrl = URLS.REDIRECT_URL; //'http://localhost:3000/'//'https://spotify-share.netlify.app/';
    const clientId = '9bf4fbf0e6cb48b09c4f974becb9eaf9';
    const scopes = [
        'playlist-read-collaborative',
        'playlist-read-private',
        'user-read-email'
    ];
    const loginUrl = `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
    return loginUrl;
}