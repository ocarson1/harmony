import './styles/Sidebar.css'
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import {ToggleSwitch} from './components/ToggleSwitch';
import FilterInfo from './components/FilterInfo'
import HistoryInfo from './components/HistoryInfo'
import EntryButton from './components/EntryButton'
import React, { useState } from 'react';
import { setTokenSourceMapRange } from 'typescript';

interface sidebarProps {
    theme: boolean;
    setTheme: Function;
    setEntryIsShown: Function;
    token: string;
    setToken: Function;
  }




//split this into two helper functions for each tab?
export default function GenerateSidebar(props: sidebarProps) {
    const [username, setUsername] = useState("<Spotify Username>")
    const [pfp, setPfp] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")

    const openNewEntry = () => {
        props.setEntryIsShown(true);
    }
    fetch(`http://localhost:3232/getUser?token=${props.token}`)
    .then(r => r.json())
    .then(json => {
        if (json.result == "success") {
            setUsername(json.name);
            setPfp(json.img_url)
        }
    });


    return (
        <div className="sidebar">
            <Tabs className = "tabs">
                <TabList>
                    <Tab>VIEW</Tab>
                    <Tab>PROFILE</Tab>
                </TabList>
                <TabPanel>
            <div className="view-tab">
                <button className="entry-button" onClick={openNewEntry}>+ ADD NEW ENTRY</button>
                <div className = "filter-by">
                    Filter by:
                </div>
                <FilterInfo />
                <ToggleSwitch 
                selected ={props.theme}
                toggleSelected={() => {
                    props.setTheme(!props.theme);
                }}
                />
            </div>
            </TabPanel>
            <TabPanel>
                <div className = "profile-tab">
                    <div className="profile-tab-header">
                        <div><img src={pfp} className="prof-pic"></img></div>
                        <div className="username">{username}</div>
                    </div>
                    <div className = "history">
                        History:
                    </div>
                    <HistoryInfo />
                    <button className="logout-button" onClick={() => props.setToken("no_access")}>LOG OUT</button>
                </div>
                </TabPanel>
            </Tabs>
        </div>
    )
}
//window.open('localhost:3000', '_self')

// function EntryButton() {
//     return(
//         <div>
//     <button className="entry-button">+ ADD NEW ENTRY</button>
//     </div>
//     )
// }

// function getUsername(token: string) {
//     console.log("getting username")
//     console.log(token)
//     fetch(`https://localhost:3232/getUser?token=${token}`)
//         .then(r => r.json())
//         .then(json => {setUsername(json.name)});
// }

function getPfp() {

}