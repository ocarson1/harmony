import { Dispatch, SetStateAction } from 'react';
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
    const [songIds, setSongIds] = useState("<Song Title>")
    const [songRecs, setSongRecs] = useState([''])
    const [artistRecs, setArtistRecs] = useState([''])

    var recSongs: string[] = [];
    var recArtists: string[] = [];
    let fruits: string[] = ["banana", 'apple', 'hahihaiha']

    const closeNewPlaylist = () => {
        setGeneratePlaylist(false);
    }

    // will probably need to use map.QueryRenderedFeatures function:
    // https://docs.mapbox.com/mapbox-gl-js/api/map/#map#queryrenderedfeatures

    const inputIds: string[] = []

    const addPlaylist = () => {

        fetch('http://localhost:3232/getCollection?name=songs')
            .then(r => r.json())
            .then(json => {
                console.log("Fetching getCollection");
                const ids = Object.keys(json.data);
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
            })
    }

    let queryInput = ""
    inputIds.forEach((id) => {
        queryInput = queryInput + id + ","
    })
    queryInput = queryInput.slice(0,-1)


    






    // fetch('http://localhost:3232/getCollection?name=songs')
    // .then(r => r.json())
    // .then(json => {
    //     console.log("Fetching getCollection"); 
    //     Object.values(json).filter(entry => {
    //     })
    //     var filtered = Object.values(json).filter(entry => {
        
    //     })    
    // })

    // let URL = `http://localhost:3232/getRecs?token=${token}&songIds=${songIds}`
    
    // let URL = `http://localhost:3232/getRecs?token=${token}&songIds=7BgyWwbbybJr2IbQoI1gzH,3UKhzKdWIM8vd1qWPxLRkP,5tt7O3V5vwf8ltkr1Wgxrf`
    // fetch(URL)
    // .then(r => r.json())
    // .then(json => {
    //     console.log("fetching getRecs")
    //     if (json.result == "success") {
    //         console.log("fetch get rec success!" + json.sorted)
    //         const recsList = json.sorted
    //         console.log("fetch get rec first item album name" + recsList[0]["album"]['name'])
    //     }
    //     else {
    //         console.log("fetch get rec fail" + token)
    //     }
    // })

    let URL = `http://localhost:3232/getRecs?token=${token}&songIds=2KWI43agrQEFVLM3soOmKW,7BgyWwbbybJr2IbQoI1gzH,3UKhzKdWIM8vd1qWPxLRkP,5tt7O3V5vwf8ltkr1Wgxrf`
    fetch(URL)
    .then(r => r.json())
    .then(json => {
        console.log("fetching getRecs")
        if (json.result == "success") {
            console.log("fetch get rec success!")
            const recsList = json.sorted
            for (let i = 0; i < 10; i++) {
                recSongs.push(recsList[i]["name"].toString())
                console.log("rec #" + i + " name: " + recsList[i]["name"].toString())
                // console.log("rec #" + i + " album name: " + recsList[i]["album"][0]["name"])
                for (let j = 0; j < recsList[i]["artists"].length; j++) {
                    recArtists.push(recsList[i]["artists"][j]["name"].toString());
                    console.log("rec #" + i + "artist #" + j + ": " + recsList[i]["artists"][j]["name"])
                }
            }
            console.log("recSongs: " + recSongs)``
            console.log("recArtists: " + recArtists)
            setSongRecs(recSongs)
        }
        else {
            console.log("fetch get rec fail" + token)
        }
    })

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
                    <p className='title-location'>Your Geoplaylist</p>
                    <p className='title-time'>@ input time here</p>
                </div>
                <button className='close-button' onClick={addPlaylist}>X</button>
            </div>
            <div className="songs-list" id="songsList">
                <p>1. {songRecs[0]}</p>
                <p>2. {songRecs[1]}</p>
                <p>3. {recSongs[2]}</p>
                <p>4. {recSongs[3]}</p>
                <p>5. {recSongs[4]}</p>
                <p>6. {recSongs[5]}</p>
                <p>7. {recSongs[6]}</p>
                <p>8. {recSongs[7]}</p>
                <p>9. {recSongs[8]}</p>
                <p>10. {recSongs[9]}</p>
            </div>
        </div>
    );
}

export default GeoPlaylist;