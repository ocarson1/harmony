import { Dispatch, SetStateAction } from 'react';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import '../styles/LogIn.css'

interface LogInProps {
    href: string
}

function LogIn({href}: LogInProps){

    const handleSubmit = () => {
        window.open(href, "_self")
    }

    console.log(document.location.href);

    return (
        <div className="welcome-popup">
            <div className="login-container">
            <div className="welcome-text">Welcome to</div>
            <div className="harmony-text">Harmony</div>
            <button className="spotify-login-button" onClick={handleSubmit}>
                LOG IN WITH SPOTIFY
            </button>
        </div>
        </div>
    );
}

export default LogIn;