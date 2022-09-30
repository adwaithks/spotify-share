import React from 'react';

// subcomponents
import AllPlaylists from '../../components/AllPlaylists/AllPlaylists';

// scss
import './Home.scss';

function Home() {

  return (
    <div className='home'>
        <AllPlaylists />
    </div>
  )
}

export default Home;