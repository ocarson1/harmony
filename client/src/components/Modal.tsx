import ts, { Map } from "typescript";
import React, { useState  } from "react";

export {}

export default function Modal(songData: ts.ESMap<String, String>) {
    const [isModalOpen, setIsModalOpen] = useState(true);

    return(
        <div>
            <p>{songData.get("title")}</p>
        </div>
    )
}