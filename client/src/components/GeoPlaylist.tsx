import { Dispatch, SetStateAction } from 'react';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import '../styles/UserEntry.css'
import Map from '../Map'

interface GeoPlaylistProps {
    setGeneratePlaylist: Function;
}

function GeoPlaylist({setGeneratePlaylist}: GeoPlaylistProps){

    const closeNewPlaylist = () => {
        setGeneratePlaylist(false);
    }

    const logEntry = () => {
    }

    return (
        <div className="playlist-popup" id="playlistPopup">
        </div>
    );
}

export default GeoPlaylist;