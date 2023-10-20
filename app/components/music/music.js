import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

const music = () => {
  const [audioUrl, setAudioUrl] = useState(''); // Store the YouTube audio URL
  const [playlist, setPlaylist] = useState([]); // Store the list of queued audio URLs

  const handleQueue = () => {
    if (audioUrl) {
      setPlaylist([...playlist, audioUrl]);
      setAudioUrl(''); // Clear the input field
    }
  };

  const handleRemoveFromPlaylist = (index) => {
    const updatedPlaylist = [...playlist];
    updatedPlaylist.splice(index, 1);
    setPlaylist(updatedPlaylist);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter YouTube Audio URL"
        value={audioUrl}
        onChange={(e) => setAudioUrl(e.target.value)}
        className='bg bg-slate-100'
      />
      <button onClick={handleQueue}>Queue</button>
      {playlist.length > 0 && (
        <div>
          <h3>Playlist:</h3>
          <ul>
            {playlist.map((url, index) => (
              <li key={index}>
                {url} <button onClick={() => handleRemoveFromPlaylist(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {playlist.length > 0 && (
        <ReactAudioPlayer src={playlist[0]} controls />
      )}
    </div>
  );
};

export default music;
