import React from 'react';

// scss
import './App.scss';

// subcomponents
import Navbar from './components/Navbar/Navbar';
import SharedList from './components/SharedList/SharedList';

// react-router-dom
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<SharedList />} path="/" />
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