import { Dispatch, SetStateAction } from 'react';
import './LogIn.css';

function LogIn(){

    const handleSubmit = () => {}

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