import '../styles/LogIn.css'

/**
 * Interface containing the input properties for the LogIn component
 */
interface LogInProps {
    href: string
}

/**
 * Component for the LogIn screen where first-time users LogIn to Harmony through Logging In with Spotify
 * @param param0 
 * @returns 
 */
function LogIn({href}: LogInProps){
    //accessible aria label and description
    const ariaLabel: string = "Log In Page"
    const ariaDescription: string = "Welcome to Harmony! Press on Log In with Spotify to get started"

    /**
     * Method for opening Spotify Log-in/Authorization Page
     */
    const handleSubmit = () => {
        window.open(href, "_self")
    }

    return (
<<<<<<< HEAD
        <div className="welcome-popup">
            <div className="login-container">
=======
        <div className="welcome-popup" aria-label={ariaLabel} aria-description={ariaDescription}>
>>>>>>> bc1d87f970c39b78854ed5a7192db8e47c9fd690
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