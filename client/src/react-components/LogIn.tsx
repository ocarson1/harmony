import { Dispatch, SetStateAction } from 'react';
import './LogIn.css';

function LogIn(){
    
    const handleSubmit = () => {
        window.open('https://accounts.spotify.com/authorize/?client_id=ce58270f079346658ebe132ae27ae27b&response_type=code&redirect_uri=https://localhost:3000', "_self")
    }

    console.log(document.location.href);

    return (
        <div className="welcome-popup">
            <div className="welcome-text">Welcome to</div>
            <div className="harmony-text">Harmony</div>
            <button className="spotify-login-button" onClick={handleSubmit}>
                LOG IN WITH SPOTIFY
            </button>
        </div>
    );
}

export default LogIn;