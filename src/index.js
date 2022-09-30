import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { PlaylistsProvider } from './context/playlistsContext';
import Modal from 'react-modal';
import { UserProvider } from './context/userContext';
import { AuthModalVisibilityProvider } from './context/authModalVisibilityContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
Modal.setAppElement(document.getElementById('root'));

root.render(
  <AuthModalVisibilityProvider>
    <UserProvider>
      <PlaylistsProvider>
        <App />
      </PlaylistsProvider>
    </UserProvider>
    </AuthModalVisibilityProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
