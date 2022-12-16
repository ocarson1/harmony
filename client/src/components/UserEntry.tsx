import { Dispatch, SetStateAction } from 'react';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import '../styles/UserEntry.css'
import '../styles/MapBox.css'
import Map from '../MapBoxPopup'


interface UserEntryProps {
    theme: boolean;
    setTheme: Function;
    setEntryIsShown: Function;
}

function UserEntry({theme, setTheme, setEntryIsShown}: UserEntryProps){

    const closeNewEntry = () => {
        setEntryIsShown(false);
    }

    const logEntry = () => {
    }

    return (
        <div className="entry-popup" id="entryPopup">
            <div className="entry-header">
                <div className='title'>New Entry</div>
                <button className='close-button' onClick={closeNewEntry}>X</button>
            </div>
            <div className="entry-header-line"></div>
            <div className="entry-text">Double click on the map to plot your location to your most recently played song</div>
            {/* <div className="entry-map">
                <Map theme={theme} setTheme={setTheme} style={{width:650, height:280, left:30, borderRadius:25}}/>
            </div> */}
            <div className="entry-map">
                <Map theme={theme} setTheme={setTheme} style={{width:650, height:280, left:30, borderRadius:25}}/>
            </div>
            <div className="entry-bottom">
                <div className="most-recent-song">
                    <img className="song-icon" src="https://i.scdn.co/image/ab67616d0000b27304b052e84325a16bc18a4c78" style={{float:'left',width:40, height:40, borderRadius:30}}></img>
                    <div className="song-info">
                        <p style={{fontSize:16, margin:0, fontWeight:500, textAlign:'left'}}>Song Name</p>
                        <p style={{fontSize:12, margin:0, fontWeight:400, textAlign:'left'}}>Artist Name</p>
                    </div>
                </div>
                <button className="done-button" onClick={logEntry}>Done</button>
            </div>
        </div>
    );
}

export default UserEntry;