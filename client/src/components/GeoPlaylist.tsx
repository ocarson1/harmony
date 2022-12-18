import { Dispatch, SetStateAction, useEffect } from 'react';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import '../styles/GeoPlaylist.css'
import Map from '../MapBox'
import React, {useState} from 'react'
import mapboxgl, {LngLatBounds} from 'mapbox-gl';
import LogIn from './LogIn';

interface GeoPlaylistProps {
    setGeneratePlaylist: Function
    token: string
    bounds: LngLatBounds
    // songIds: string
}

function GeoPlaylist({setGeneratePlaylist, token, bounds}: GeoPlaylistProps){
    const [songIds, setSongIds] = useState("")
    const [songRecs, setSongRecs] = useState([''])
    const [artistRecs, setArtistRecs] = useState([''])
    const [imgRecs, setImgRecs] = useState(["https://img.icons8.com/ios-glyphs/512/question-mark.png"])
    const [previewRecs, setPreviewRecs] = useState(["https://img.icons8.com/ios-glyphs/512/question-mark.png"])
    const [recs, setRecs] = useState([''])

    const recSongs: string[] = [];
    const recArtists: string[] = [];
    const recImgs: string[] = [];
    const recPreviews: string[] = [];
    const recItem: string[] = [];

    const closeNewPlaylist = () => {
        setGeneratePlaylist(false);
    }

    // will probably need to use map.QueryRenderedFeatures function:
    // https://docs.mapbox.com/mapbox-gl-js/api/map/#map#queryrenderedfeatures


    const addPlaylist = () => {
        // {songRecs.map(function(item, i){console.log(item); return <p key={i}>{i+1}. {item}</p>})}
        const item: string = ''
        songRecs.map(function(item, i){})
    }

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
                            recSongs.push(recsList[i]["title"].toString())
                            console.log("rec #" + i + " title: " + recsList[i]["title"].toString())
                            recArtists.push(recsList[i]["artist"].toString())
                            recImgs.push(recsList[i]["img_url"].toString())
                            recPreviews.push(recsList[i]["preview_url"].toString())
                            console.log("rec #" + i + " artist: " + recsList[i]["artist"].toString())
                        }
                        setSongRecs(recSongs)
                        setArtistRecs(recArtists)
                        setImgRecs(recImgs)
                        setPreviewRecs(recPreviews)
                    }
                    else {
                        console.log("fetch get rec fail" + token)
                    }
                })
            },[songIds])

    const makeTitleArtist = () => {
        songRecs.map(function(item, i){console.log(item); return <p key={i}>{i+1}. {item}</p>})
        previewRecs.map(function(item, i){console.log(item); return <button key={i} className="preview-button" onClick={() => window.open(item)}>PREVIEW</button>})
    }

    return (
        <div className="playlist-popup" id="playlistPopup">
            <div className="playlist-header">
                {/* <div className='playlist-icon-wrapper'> */}
                    <div className='playlist-icon'>
                        <img src={imgRecs[0]} style={{width:60, height:60}}></img>
                        <img src={imgRecs[1]} style={{width:60, height:60}}></img>
                        <img src={imgRecs[2]} style={{width:60, height:60}}></img>
                        <img src={imgRecs[3]} style={{width:60, height:60}}></img>
                    </div>
                {/* </div> */}
                <div className='playist-title-wrapper'>
                    <p className='playlist-title'>Your <br></br> Geoplaylist</p>
                </div>
                <button className='close-button' onClick={closeNewPlaylist}>X</button>
            </div>
            <div className="playlist-content">
                {/* <table>
                    <thead>
                    <tr>
                        <th scope="col">TITLE</th>
                        <th scope="col">ALBUM</th>
                        <th scope="col"></th>
                        <th scope="col">Most famous song</th>
                    </tr>
                    </thead>
                </table> */}
                <div className="songs-list">
                    {songRecs.map(function(item, i){console.log(item); return <p key={i}>{i+1}. {item}</p>})}
                </div>
                <div>
                    {previewRecs.map(function(item, i){console.log(item); return <button key={i} className="preview-button" onClick={() => window.open(item)}>PREVIEW</button>})}
                </div>
            </div>
        </div>
    );
}

export default GeoPlaylist;