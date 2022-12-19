import './styles/Sidebar.css'
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import {ToggleSwitch} from './components/ToggleSwitch';
import FilterInfo from './components/FilterInfo'
import { useState, useEffect} from 'react';

interface sidebarProps {
    theme: boolean;
    setTheme: Function;
    setEntryIsShown: Function;
    token: string;
    setToken: Function;
    filterCategories: Array<Set<string>>
    setFilter: Function;
  }

/**
 * THe sidebar class is in charge of rendering the sidebar that interacts with the map.
 * @param props are from the sidebarProps interface and contain states that interact with the map
 * @returns the interactive rendering of the sidebar
 */
export default function GenerateSidebar(props: sidebarProps) {
    const [username, setUsername] = useState("<Spotify Username>")
    const [pfp, setPfp] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")

    const openNewEntry = () => {
        props.setEntryIsShown(true);
    }

    useEffect(() => {
    fetch(`http://localhost:3232/getUser?token=${props.token}`)
    .then(r => r.json())
    .then(json => {
        console.log("Fetching getUser")
        if (json.result == "success") {
            setUsername(json.name);
            setPfp(json.img_url)
        }
    });
}, [])

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
                <FilterInfo categories={props.filterCategories} setFilter={props.setFilter}/>
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
                    <button className="logout-button" onClick={() => props.setToken("no_access")}>LOG OUT</button>
                </div>
                </TabPanel>
            </Tabs>
        </div>
    )
}