import React from 'react';
import MySpotifyPlaylists from '../../components/MySpotifyPlaylists/MySpotifyPlaylists';

// subcomponents
import PlaylistCard from '../../components/PlaylistCard/PlaylistCard';
import { authModalVisibilityContext } from '../../context/authModalVisibilityContext';

// usercontext
import { userContext } from '../../context/userContext';

// spotify api utils
import { getUserPlaylists } from '../../utils/spotifyAPI/getUserPlaylists';

// scss
import './User.scss';


function User() {

    const {user, setUser} = React.useContext(userContext);
    const {setAuthModalIsOpen} = React.useContext(authModalVisibilityContext);

    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [currentTab, setCurrentTab] = React.useState('MY_SPOTIFY_PLAYLISTS')


    const clearUser = () => {
        setUser({
            token: "",
            isLoggedIn: false,
            name: "",
            imageUrl: ""
        });
        window.localStorage.removeItem('user');
    }

    // get currently logged in user's playlists
    const getUserPlaylistsHelper = async () => {
        let response = await getUserPlaylists(user.token);
        if (response.status !== 200) {
            setAuthModalIsOpen(true);
            setUser({
                token: "",
                isLoggedIn: false,
                name: "",
                imageUrl: ""
            });
            window.localStorage.removeItem('user');
            return;
        }
        let data = response.data;
        setIsLoading(false);
        setData(data.items);
    }

    React.useEffect(() => {
        setIsLoading(true);
        getUserPlaylistsHelper();
    }, []);

  return (
    <div className='user'>
        <nav className="user__playlists__nav">
            <p onClick={() => setCurrentTab('MY_SPOTIFY_PLAYLISTS')} className={currentTab === 'MY_SPOTIFY_PLAYLISTS' ? 'user__playlists__nav__tab-active' : 'user__playlists__nav__tab'}>My Spotify Playlists</p>
            {/*<p className='user__playlists__nav__tab-disabled'>Shared Playlists</p>*/}
        </nav>

        <div className='user__sharedlist'>
            {
                currentTab === 'MY_SPOTIFY_PLAYLISTS' ? 
                (
                <>
                    <div className='user__header'>
                        <h1>Playlists</h1>
                    </div>
                    {
                        isLoading && <h1 className='user__sharedlist__loading'>Getting all your spotify playlists :)</h1>
                    }
                    <MySpotifyPlaylists playlists={data} />
                </>
                ) 
                :
                (
                    <></>
                )
            }
        </div>
    </div>
  )
}

export default User