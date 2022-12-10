import './styles/Sidebar.css'
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import {ToggleSwitch} from './components/ToggleSwitch';
import EntryButton from './components/EntryButton'
import FilterInfo from './components/FilterInfo'
import HistoryInfo from './components/HistoryInfo'
import React, { useState } from 'react';

interface sidebarProps {
    theme: boolean;
    setTheme: Function;
}

export default function GenerateSidebar(props: sidebarProps) {

    return (
        <div className="sidebar">
            <Tabs className = "tabs">
                <TabList>
                    <Tab>VIEW</Tab>
                    <Tab>PROFILE</Tab>
                </TabList>
                <TabPanel>
            <div className="view-tab">
                <EntryButton></EntryButton>
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
{/* 
function EntryButton() {
    return(
        <div>
    <button className="entry-button">+ ADD NEW ENTRY</button>
    </div>
    )
} */}