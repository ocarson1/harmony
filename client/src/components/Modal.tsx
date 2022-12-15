import ts, { Map } from "typescript";
import React, { useState  } from "react";
import '../styles/Modal.css'

export {}

interface modalProps {
    isActivated: boolean;
    songData: ts.ESMap<string,Object>
    location: Array<number>
}

export default function Modal({isActivated, songData, location}:modalProps) {

    const variations = new Map(Object.entries(songData))
    console.log("variations")
 
    if (!isActivated) {
        return null
    }

    return(
        <div className="modal" style={{left:(location[0]) + 'px', top:(location[1]-120)+'px'}}>
            <div className="modal-content">
                {/* <div className="modal-header">
                    <h4 className="modal-title">SONG INFO</h4>
                </div> */}
                <div className="modal-body">
                    <p><strong>Song:</strong> {variations.get("title")}</p>
                    <p><strong>Artist:</strong> {variations.get("artist")}</p>
                    <p><strong>Album:</strong> {variations.get("album")}</p>
                    <p><strong>Release Year:</strong> {variations.get("release_date")}</p>
                    <p><strong>Genre:</strong> {variations.get("genres")}</p>
                    {/* <p>Song: {props.songData.get("title")}</p> */}
                </div>

                <div className="modal-footer">
                    <button className="preview-button">PREVIEW</button>
                    <button className="add-button">ADD TO LIKED</button>
                </div>
                <div className="modal-pointer"></div>
            </div>
        </div>
    )
}
