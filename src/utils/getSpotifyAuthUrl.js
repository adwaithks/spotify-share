export function getSpotifyAuthUrl() {
    const authUrl = 'https://accounts.spotify.com/authorize';
    const redirectUrl = 'https://spotify-share.netlify.app/';
    const clientId = '9bf4fbf0e6cb48b09c4f974becb9eaf9';
    const scopes = [
        'playlist-read-collaborative',
        'playlist-read-private'
    ];
    const loginUrl = `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
    return loginUrl;
}