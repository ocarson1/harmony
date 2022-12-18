import { Dispatch, SetStateAction, useEffect } from 'react';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import '../styles/UserEntry.css'
import '../styles/MapBox.css'
import Map from '../MapBoxPopup'
import React, {useState} from 'react'


interface UserEntryProps {
    theme: boolean;
    setTheme: Function;
    setEntryIsShown: Function;
    token: string
}

function UserEntry({theme, setTheme, setEntryIsShown, token}: UserEntryProps){
    const [entryLat, setEntryLat] = useState(0);
    const [entryLon, setEntryLon] = useState(0)
    const [recentTitle, setRecentTitle] = useState("<Song Title>")
    const [recentImage, setRecentImage] = useState("https://img.icons8.com/ios-glyphs/512/question-mark.png")
    const [recentArtist, setRecentArtist] = useState("<Artist>")
    const [recentId, setRecentId] = useState("")

    //add artist to the backend handler?

    const closeNewEntry = () => {
        setEntryIsShown(false);
    }

    useEffect(() => {

    let URL = `http://localhost:3232/getRecentSong?token=${token}`
    fetch(URL)
    .then(r => r.json())
    .then(json => {
        console.log("Fetching getRecentSong")
        if (json.result == "success") {
            console.log("JSON SUCCESS")
            setRecentTitle(json.name)
            setRecentImage(json.img_url)
            setRecentArtist(json.artist)
            setRecentId(json.id)
        }
        else console.log("JSON NOT SUCCESS" + token)
        
    })
}, [])
    
    const logEntry = () => {
        let URL = `http://localhost:3232/addSongAtLoc?id=${recentId}&lat=${entryLat}&lon=${entryLon}&token=${token}`
        console.log(URL)
        console.log("Fetching addSongAtLoc")
        fetch(URL) // I think this is all we have to do?
        window.location.reload()

        // might need to re-call the marker handler now
    }

    return (
        <div className="entry-popup" id="entryPopup">
            <div className="entry-header">
                <div className='title'>New Entry</div>
                <button className='close-button' onClick={closeNewEntry}>X</button>
            </div>
            <div className="entry-header-line"></div>
            <div className="entry-text">Double click on the map to plot your location for your most recently played song</div>
            {/* <div className="entry-map">
                <Map theme={theme} setTheme={setTheme} style={{width:650, height:280, left:30, borderRadius:25}}/>
            </div> */}
            <div className="entry-map">
                <Map theme={theme} setTheme={setTheme} style={{width:650, height:280, left:30, borderRadius:25}} setEntryLon= {setEntryLon} setEntryLat= {setEntryLat} />
            </div>
            <div className="entry-bottom">
                <div className="most-recent-song">
                    <img className="song-icon" src={recentImage} style={{float:'left',width:40, height:40, borderRadius:30}}></img>
                    <div className="song-info">
                        <p style={{fontSize:16, margin:0, fontWeight:500, textAlign:'left'}}>{recentTitle}</p>
                        <p style={{fontSize:12, margin:0, fontWeight:400, textAlign:'left'}}>{recentArtist}</p>
                    </div>
                </div>
                <button className="done-button" onClick={() => {logEntry(); closeNewEntry()}}>Done</button>
            </div>
        </div>
    );
}

export default UserEntry;