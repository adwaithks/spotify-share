import React from 'react';

// user context
import { userContext } from './context/userContext';

// scss
import './App.scss';

// subcomponents
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';

// utilities
import { getUserData } from './utils/spotifyAPI/getUserData';

// react-router-dom
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import User from './pages/User/User';

function App() {

  const { setUser } = React.useContext(userContext);

  async function authenticateUser(token) {
    if (!token) return;
    let response = await getUserData(token);
    let data = response.data;
    // set user state
    setUser({
      name: data.display_name,
      token: token,
      isLoggedIn: true,
      imageUrl: data.images[0].url
    });

    // set localstorage for persistance
    window.localStorage.setItem('user', JSON.stringify({
      name: data.display_name,
      token: token,
      isLoggedIn: true,
      imageUrl: data.images[0].url
    }));

    console.log(window.localStorage.getItem('user'));
  }

  React.useEffect(() => {
    console.log('app component rendered');
    if (!window.location.hash) return;
    console.log('app component: ', window.location.hash);
    try {
      const spotifyAuthData = window.location.hash.substring(1).split('&');
      const token = spotifyAuthData[0].split('=')[1];
      window.location.hash = "";
  
      authenticateUser(token);
    } catch(err) {
      return;
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<User />} path="/myplaylists" />
        </Routes>
      </BrowserRouter>  
    </div>
  );
}

export default App;
/*
<meta property="og:title" content="Manavaalan Thug - From &quot;Thallumaala&quot;"/>
<meta property="og:description" content="Dabzee · Song · 2022"/>
<meta property="og:url" content="https://open.spotify.com/track/0MHiYjjcHNYM9KURa6NveF"/>
<meta property="og:image" content="https://i.scdn.co/image/ab67616d0000b273c90fa69efea26b2932a616cf"/>
<meta property="og:type" content="music.song"/>
*/