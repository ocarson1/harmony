import './styles/Sidebar.css'
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import {ToggleSwitch} from './components/ToggleSwitch';
import FilterInfo from './components/FilterInfo'
import HistoryInfo from './components/HistoryInfo'
import EntryButton from './components/EntryButton'
import React, { useState } from 'react';

interface sidebarProps {
    theme: boolean;
    setTheme: Function;
    token: string;
  }

export default function GenerateSidebar(props: sidebarProps) {
//usestate name setname
    return (
        <div className="sidebar">
            <Tabs className = "tabs">
                <TabList>
                    <Tab>VIEW</Tab>
                    <Tab>PROFILE</Tab>
                </TabList>
                <TabPanel>
            <div className="view-tab">
                <EntryButton />
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
                    {/* <div className="name">{getUsername(props.token)}</div> */}
                    <div className = "history">
                        History:
                    </div>
                    <HistoryInfo />
                </div>
                </TabPanel>
            </Tabs>
        </div>
    )
}

// function EntryButton() {
//     return(
//         <div>
//     <button className="entry-button">+ ADD NEW ENTRY</button>
//     </div>
//     )
// }


function getUsername(token: string) {
    fetch(`https://localhost:3232/getUser?token=${token}`)
        .then(r => r.json())
        .then(json => {return json.name});
}