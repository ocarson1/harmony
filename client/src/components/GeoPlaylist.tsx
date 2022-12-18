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
    let URL = `http://localhost:3232/getRecs?token=${token}&songIds=7BgyWwbbybJr2IbQoI1gzH,3UKhzKdWIM8vd1qWPxLRkP,5tt7O3V5vwf8ltkr1Wgxrf`
    fetch(URL)
    .then(r => r.json())
    .then(json => {
        console.log("fetching getRecs")
        if (json.result == "success") {
            console.log("fetch get rec success!" + json.sorted)
            const recsList = json.sorted
            console.log("fetch get rec first item album name" + recsList[0]["album"]['name'])
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
                    <p className='title-location'>INPUT LOCATION HERE</p>
                    <p className='title-time'>@ input time here</p>
                </div>
                <button className='close-button' onClick={addPlaylist}>X</button>
            </div>
            <div className="songs-list">
                <p>1.</p>
                <p>2.</p>
                <p>3.</p>
                <p>4.</p>
                <p>5.</p>
                <p>6.</p>
                <p>7.</p>
                <p>8.</p>
                <p>9.</p>
                <p>10.</p>
            </div>
        </div>
    );
}

export default GeoPlaylist;