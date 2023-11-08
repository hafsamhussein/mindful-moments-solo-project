import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import YouTube from 'react-youtube'; 

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const opts = {
    height: '380', 
    width: '660', 
    playerVars: {
      
      autoplay: 0, // Auto-play disabled (0) or enabled (1)
    },
  };
  const videoId = 'SYMsBN_DkfY'; 

  return (
    <div className="container">
      <h2>Welcome to Mindful Moments, {user.username}!</h2>
      <p>{user.id}</p>
      <YouTube videoId={videoId} opts={opts} />

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;



