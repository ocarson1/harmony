import React, { useEffect, useState, useRef } from 'react'
// import {Routes, Route, useNavigate} from 'react-router-dom'
import './App.css';
import LogIn from './react-components/LogIn';

function App() {
  const CLIENT_ID = 'ce58270f079346658ebe132ae27ae27b'
  const CLIENT_SECRET = '8ce08f38b60f474896c4ce17af94d709'
  const REDIRECT_URI = 'http://localhost:3000'
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [access_token, setAccessToken] = useState("");

  useEffect(() => {
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
}, [])

fetch('http://localhost:3232/getTrack?id=11dFghVXANMIKmJXsNCbNI&token=' + access_token)
.then(r => r.json())
.then(r => {
  if(r.result==="success"){
    console.log(access_token)
  }
})

//
  // return (
  //   <div className="App">
  //     <div className="web-container">
  //       <img className="" src="./images/mapboxbackground.jpg"></img>
  //       <LogIn></LogIn>
  //     </div>
  //   </div>
  // );

  //temporary html for testing spotify auth from tutorial
  return (
    <div className="App">
       <header className="App-header">
                <h1>Spotify React</h1>
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
        </header>
    </div>
  );
}
export default App;