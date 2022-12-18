import ts, { isPropertySignature, Map } from "typescript";
import React, { useEffect, useState } from "react";
import '../styles/Modal.css'
import AddToLikedButton from "./AddToLikedButton";

export {}

interface modalProps {
    isActivated: boolean;
    setActivation: Function;
    songData: ts.ESMap<string,Object>
    location: Array<number>
    token: string
}

export default function Modal({isActivated, setActivation, songData, location, token}:modalProps) {

    if (!isActivated) {
        return null
    }

    const variations = new Map(Object.entries(songData))

    console.log(variations.get("genres"))

    let genres = Array.from(variations.get("genres"))
    genres = genres.slice(0,2)

    let genreString = ""

    genres.forEach((x) => {
        genreString = genreString + x + ", "
    })
    genreString = genreString.slice(0,-1);
    console.log(genreString)
    genreString = genreString.concat(" ...");

    return(
        <div className="modal" style={{left:(location[0]) + 'px', top:(location[1]-140)+'px'}}>
            <button className='modal-close-button' onClick={() => setActivation(false)}>X</button>

            <div className="modal-content">
                {/* <div className="modal-header">
                    <h4 className="modal-title">SONG INFO</h4>
                </div> */}
                <div className="modal-body">
                    <p><strong>Song:</strong> {variations.get("title")}</p>
                    <p><strong>Artist:</strong> {variations.get("artist")}</p>
                    <p><strong>Album:</strong> {variations.get("album")}</p>
                    <p><strong>Release Year:</strong> {variations.get("release_date")}</p>
                    <p><strong>Genre:</strong> {genreString}</p>
                    {/* <p>Song: {props.songData.get("title")}</p> */}
                </div>

                <div className="modal-footer">
                    <button className="preview-button" onClick={() => window.open(variations.get("preview_url"))}>PREVIEW</button>
                    <AddToLikedButton songId={variations.get("id")} token={token}/>
                </div>
                <div className="modal-pointer"></div>
            </div>
        </div>
    )
}
