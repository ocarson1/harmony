import React, { useEffect, useState, useRef } from 'react'
// import {Routes, Route, useNavigate} from 'react-router-dom'
import './App.css';
import LogIn from './react-components/LogIn';

const getTokenFromUrl = () => {
  return window.location.hash
  .substring(1)
  .split('&')
  .reduce((initial: any, item: any) => {
    let parts: string[] = item.split("=")
    initial[parts[0]] = decodeURIComponent(parts[1])
    return initial;
  });
}

function App() {
  const CLIENT_ID = '50b02aae40fd4b2c99db1dbe69cb3935'
  const CLIENT_SECRET = ''
  const REDIRECT_URI = 'http://localhost:3000'
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash: string = window.location.hash

    if (hash) {
      console.log("use effect inside if")
      const token = hash.substring(1).split("&")[0].split('=')[1]
  }
}, )

//other tutorial stuff???

//   useEffect(() => {
//     var authParameters = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: 'grant_type =' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
//     }
//     fetch('https://accounts.spotify.com/api/token', authParameters)
// }, [])
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