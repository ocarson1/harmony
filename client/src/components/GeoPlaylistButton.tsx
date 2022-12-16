import '../styles/GeoPlaylistButton.css'
import '../styles/GeoPlaylist.css'
import GeoPlaylist from './GeoPlaylist'

interface GeoPlaylistButtonProps {
    setGeneratePlaylist: Function;
}

function GeoPlaylistButton({setGeneratePlaylist}: GeoPlaylistButtonProps) {

    const openNewPlaylist = () => {
        setGeneratePlaylist(true);
    }
    
    return(
        <button className="playlist-button" onClick={openNewPlaylist}>MAKE A GEO-PLAYLIST</button>
    )
}

export default GeoPlaylistButton;