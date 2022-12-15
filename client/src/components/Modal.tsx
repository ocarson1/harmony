import ts, { Map } from "typescript";
import React, { useState  } from "react";
import '../styles/Modal.css'

export {}

interface modalProps {
    isActivated: boolean;
    songData: ts.ESMap<string,Object>
    //add songdata map?
}

export default function Modal({isActivated, songData}:modalProps) {

    const variations = new Map(Object.entries(songData))
    console.log(songData)
    console.log(variations)
    console.log(typeof(variations))
    console.log(variations.get("title"))
 
    

    if (!isActivated) {
        return null
    }

    else return(
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">SONG INFO</h4>
                </div>
                <div className="modal-body">
                    <p>Song:</p>
                    <p>Artist:</p>
                    <p>Album:</p>
                    <p>Release Year:</p>
                    <p>Genre:</p>
                    {/* <p>Song: {props.songData.get("title")}</p> */}
                </div>

                <div className="modal-footer">
                    <button className="close-button">Close</button>
                </div>
                <div className="modal-pointer"></div>
            </div>
        </div>
    )
}
