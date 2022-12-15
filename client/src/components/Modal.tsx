import ts, { Map } from "typescript";
import React, { useState  } from "react";
import '../styles/Modal.css'

export {}

interface modalProps {
    isActivated: boolean;
    songData: ts.ESMap<string,Object>
    location: Array<number>
    //location: Array<Number>
    //add songdata map?
}

export default function Modal({isActivated, songData, location}:modalProps) {

    const variations = new Map(Object.entries(songData))
    console.log(songData)
    console.log(variations)
    console.log(typeof(variations))
    console.log(variations.get("title"))

 
    if (!isActivated) {
        return null
    }
    console.log("location" + location)



    return(
        <div className="modal" style={{left:(location[0]) + 'px', top:(location[1]-120)+'px'}}>
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">SONG INFO</h4>
                </div>
                <div className="modal-body">
                    <p>Song: {variations.get("title")}</p>
                    <p>Artist: {variations.get("artist")}</p>
                    <p>Album: {variations.get("album")}</p>
                    <p>Release Year: {variations.get("release_date")}</p>
                    <p>Genre: {variations.get("genres")}</p>
                    {/* <p>Song: {props.songData.get("title")}</p> */}
                </div>

                <div className="modal-footer">
                    {/* <button className="close-button">Close</button> */}
                </div>
                <div className="modal-pointer"></div>
            </div>
        </div>
    )
}
