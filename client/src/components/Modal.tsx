import ts, { Map } from "typescript";
import React, { useState  } from "react";
import '../styles/Modal.css'

export {}

interface modalProps {
    isActivated: boolean
    songData: ts.ESMap<Object,Object>
    //add songdata map?
}

export default function Modal(props: modalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(props.songData)
    console.log(props.songData.has("title"))

    if (!props.isActivated) {
        return null
    }

    else return(
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">SONG INFO</h4>
                </div>
                <div className="modal-body">
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
