import { Dispatch, SetStateAction, useEffect } from 'react';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import '../styles/GeoPlaylist.css'
import Map from '../MapBox'
import React, {useState} from 'react'
import mapboxgl, {LngLatBounds} from 'mapbox-gl';
import LogIn from './LogIn';
import AddToLikedButton from './AddToLikedButton';

interface GeoPlaylistProps {
    setGeneratePlaylist: Function
    token: string
    bounds: LngLatBounds
}

function GeoPlaylist({setGeneratePlaylist, token, bounds}: GeoPlaylistProps){
    const [songIds, setSongIds] = useState("")
    const [imgRecs, setImgRecs] = useState(["https://img.icons8.com/ios-glyphs/512/question-mark.png"])
    const [previewRecs, setPreviewRecs] = useState([''])
    const [recs, setRecs] = useState([''])

    const recImgs: string[] = [];
    const recPreviews: string[] = [];
    const recItems: string[] = [];

    const closeNewPlaylist = () => {
        setGeneratePlaylist(false);
    }

    // will probably need to use map.QueryRenderedFeatures function:
    // https://docs.mapbox.com/mapbox-gl-js/api/map/#map#queryrenderedfeatures

    useEffect(() => {
    fetch('http://localhost:3232/getCollection?name=songs')
        .then(r => r.json())
        .then(json => {
            console.log("Fetching getCollection");
            const ids = Object.keys(json.data);

            const inputIds: string[] = []
            let queryInput = ""

            for (const id of ids) {
                const coordinates = json.data[id].data["userGeoJSON"]["geometry"]["coordinates"]
                console.log(coordinates)
                const lon = coordinates[0]
                const lat = coordinates[1]

                //bug: stops if invalid lat or lon values are in dataset
                if (bounds.contains(coordinates)) {
                    inputIds.push(json.data[id].data["id"])
                    console.log(inputIds)
                }
            }
            inputIds.forEach((id) => {
                queryInput = queryInput + id + ","
            })
            queryInput = queryInput.slice(0,-1)
            //setSongIds(queryInput)
            setSongIds(queryInput)})

        },[])

        useEffect(() => {
            if (songIds == "") return;
            let URL = `http://localhost:3232/getRecs?token=${token}&songIds=${songIds}`
            console.log("GPURL " + URL)
            fetch(URL)
                .then(r => r.json())
                .then(json => {
                    console.log("Fetching getRecs")
                    if (json.result == "success") {
                        console.log("fetch get rec success!")
                        const recsList = json.sorted
                        for (let i = 0; i < 10; i++) {
                            const title = recsList[i]["title"].toString()
                            const artist = recsList[i]["artist"].toString()
                            // recIds.push(recsList[i]["img_url"].toString())
                            recImgs.push(recsList[i]["img_url"].toString())
                            recPreviews.push(recsList[i]["preview_url"].toString())
                            recItems.push(title + " by " + artist)
                        }
                        setImgRecs(recImgs)
                        setPreviewRecs(recPreviews)
                        setRecs(recItems)
                    }
                    else {
                        console.log("fetch get rec fail" + token)
                    }
                })
            },[songIds])

    return (
        <div className="playlist-popup" id="playlistPopup">
            <div className="playlist-header">
                    <div className='playlist-icon'>
                        <img className="song-img" src={imgRecs[0]}></img>
                        <img className="song-img" src={imgRecs[1]}></img>
                        <img className="song-img" src={imgRecs[2]}></img>
                        <img className="song-img" src={imgRecs[3]}></img>
                    </div>
                <div className='playist-title-wrapper'>
                    <p className='playlist-title'>Your <br></br> Geoplaylist</p>
                </div>
                <button className='close-button' onClick={closeNewPlaylist}>X</button>
            </div>
            <div className="playlist-content">
                <div className="songs-list">
                    {recs.map(function(item, i){console.log(item); 
                        return (
                        <div>
                            <p style={{margin:0}} key={i}>{i+1}. {item}</p>
                            <button key={i} className="preview-button-playlist" onClick={() => window.open(previewRecs[i])}>PREVIEW</button>
                            {/* <button key={i} className="add-button-playlist" style={{width:115}} onClick={() => window.open(previewRecs[i])}>ADD TO LIKED</button> */}
                            <AddToLikedButton token={token} songId={songIds[i]}></AddToLikedButton>
                        </div>)}
                    )}
                </div>
            </div>
        </div>
    );
}

export default GeoPlaylist;