import React, {useState, useEffect} from 'react';
import './styles/App.css'; 
import Sidebar from './Sidebar'
import LogIn from './components/LogIn'
import UserEntry from './components/UserEntry';
import GeoPlaylist from './components/GeoPlaylist';
import GeoPlaylistButton from './components/GeoPlaylistButton';
import Map from './MapBox.jsx'
import './styles/MapBox.css'

let entryClearance: boolean = false;

function App() {

  const CLIENT_ID = 'ce58270f079346658ebe132ae27ae27b'
  const CLIENT_SECRET = '8ce08f38b60f474896c4ce17af94d709'
  const REDIRECT_URI = 'http://localhost:3000'
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPES = "user-read-recently-played user-library-modify user-read-email user-read-private"

  const [access_token, setAccessToken] = useState("no_access");
  const [theme, setTheme] = useState(false);
  const [entryIsShown, setEntryIsShown] = useState(false);
  const [generatePlaylist, setGeneratePlaylist] = useState(false);

  console.log("entryIsShown " + entryIsShown)

  useEffect(() => {
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    

    if (window.location.hash !== "") {
      setAccessToken(window.location.hash.substring(14,238))
    }

  }, [])

  useEffect(() => {
    console.log("The most recent token is " + access_token)
  }, [access_token])

  const href: string = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`
  
  if (access_token !== "no_access") {
    console.log('Rendering Main')
    return (
      <div className="App">
        <div className="web-container">
          <Map theme={theme} setTheme={setTheme}/>
          <GeoPlaylistButton setGeneratePlaylist={setGeneratePlaylist}/>
          {/* <button className="playlist-button" onClick={() => {setGeneratePlaylist(true)}}>MAKE A GEO-PLAYLIST</button> */}
          <Sidebar theme={theme} setTheme={setTheme} setEntryIsShown={setEntryIsShown} token={access_token} setToken={setAccessToken}/> 
          {generatePlaylist && <GeoPlaylist setGeneratePlaylist={setGeneratePlaylist} token={access_token}></GeoPlaylist>}
          {entryIsShown && <UserEntry theme={theme} setTheme={setTheme} setEntryIsShown={setEntryIsShown} token={access_token}></UserEntry>}
        </div>
      </div>
    );
  }
  else {
    console.log('Rendering Entry')
    return (
      <div className="App">
        <div className="web-container">
          <img className="" src="client/images"></img>
         <LogIn href={href}></LogIn>
        </div>
      </div>
    )
    }
  }
  //}




// function Entrance() {
//   const CLIENT_ID = 'ce58270f079346658ebe132ae27ae27b'
//   const CLIENT_SECRET = '8ce08f38b60f474896c4ce17af94d709'
//   const REDIRECT_URI = 'http://localhost:3000'
//   const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
//   const RESPONSE_TYPE = "token"

//   const [access_token, setAccessToken] = useState("");

//   useEffect(() => {
//     var authParameters = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
//     }

//     fetch('https://accounts.spotify.com/api/token', authParameters)
//       .then(result => result.json())
//       .then(data => setAccessToken(data.access_token))
//   }, [])

//   const href: string = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`

//   return (
//     <div className="App">
//       <div className="web-container">
//         <img className="" src="./images/mapboxbackground.jpg"></img>
//         <LogIn href={href}></LogIn>
//       </div>
//     </div>
//   );
// }

// function Main() {
//   const [theme, setTheme] = useState(false);

//   return (
//     <div className="App">
//       <div className="web-container">
//         <Map theme={theme} setTheme={setTheme}/>
//         <Sidebar theme={theme} setTheme={setTheme}/> 
//       </div>
//     </div>
//   );
// }

export default App;
