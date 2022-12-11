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
    setEntryIsShown: Function;
  }

export default function GenerateSidebar(props: sidebarProps) {

    const openNewEntry = () => {
        props.setEntryIsShown(true);
    }

    return (
        <div className="sidebar">
            <Tabs className = "tabs">
                <TabList>
                    <Tab>VIEW</Tab>
                    <Tab>PROFILE</Tab>
                </TabList>
                <TabPanel>
            <div className="view-tab">
                {/* <EntryButton /> */}
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