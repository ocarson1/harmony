import { Dispatch, SetStateAction } from 'react';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import '../styles/UserEntry.css'
import Map from '../MapBox'

interface UserEntryProps {
    theme: boolean;
    setTheme: Function;
}

function UserEntry({theme, setTheme}: UserEntryProps){
    
    return (
        <div className="entry-popup" id="entryPopup">
            <div className="entry-header">New Entry</div>
            <div className="entry-header-line"></div>
            <div className="entry-text">Double click on the map to plot your location to your most recently played song</div>
            <div className="map-wrapper">
                <Map theme={theme} setTheme={setTheme} style={{width:400, height:300}}/>
            </div>
            <div className="most-recent-song"></div>
        </div>
    );
}

export default UserEntry;