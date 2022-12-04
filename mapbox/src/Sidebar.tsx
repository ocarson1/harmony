import './styles/Sidebar.css'
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import {ToggleSwitch} from './components/ToggleSwitch';
import FilterInfo from './components/FilterInfo'
import React, { useState } from 'react';


export default function GenerateSidebar() {
    const [theme, setTheme] = useState(false);

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
                selected ={theme}
                toggleSelected={() => {
                    setTheme(!theme);
                }}
                />
            </div>
            </TabPanel>
            <TabPanel>
                <div className = "profile-tab">
                </div>
                </TabPanel>
            </Tabs>
        </div>
    )
}

function EntryButton() {
    return(
        <div>
    <button className="entry-button">+ ADD NEW ENTRY</button>
    </div>
    )
}