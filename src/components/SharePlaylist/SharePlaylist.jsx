import React from 'react'

function SharePlaylist({setList}) {

    const [playlistUrl, setPlaylistUrl] = React.useState('');

    function playlistUrlChangeHandler(e) {
        setPlaylistUrl(e.target.value);
    }

    async function sharePlaylistUrl() {
        const response = await fetch('http://localhost:5000/preview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: playlistUrl
            })
        });
        const metaInfo = await response.json();
        metaInfo['playlistUrl'] = playlistUrl;
        console.log(metaInfo);
        setList((prev) => [...prev, metaInfo]);
    }

  return (
    <div>
        <textarea onChange={playlistUrlChangeHandler} name="" id="" cols="30" rows="10">

        </textarea>
        <button onClick={sharePlaylistUrl}>confirm</button>
    </div>
  )
}

export default SharePlaylist