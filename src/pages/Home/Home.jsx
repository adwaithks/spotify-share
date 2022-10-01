import React from 'react';

// subcomponents
import AllPlaylists from '../../components/AllPlaylists/AllPlaylists';

// scss
import './Home.scss';


function Home() {

  return (
    <div className='home'>
        <h1 className='home__header'>Explore Playlists</h1>
        <AllPlaylists />
    </div>
  )
}

export default Home;