import { Dispatch, SetStateAction } from 'react';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import '../styles/GeoPlaylist.css'
import Map from '../MapBox'

interface GeoPlaylistProps {
    setGeneratePlaylist: Function;
}

function GeoPlaylist({setGeneratePlaylist}: GeoPlaylistProps){

    const closeNewPlaylist = () => {
        setGeneratePlaylist(false);
    }

    const addPlaylist = () => {
    }

    return (
        <div className="playlist-popup" id="playlistPopup">
            <div className="playlist-header">
                <div className='playlist-icon'>
                    <div style={{backgroundColor:'white'}}></div>
                    <div style={{backgroundColor:'red'}}></div>
                    <div style={{backgroundColor:'green'}}></div>
                    <div style={{backgroundColor:'purple'}}></div>
                </div>
                <div className='playist-title'>
                    <p style={{}}>input location here</p>
                    <p style={{}}>@ input time here</p>
                </div>
                <button className='close-button' onClick={closeNewPlaylist}>X</button>
            </div>
        </div>
    );
}

export default GeoPlaylist;