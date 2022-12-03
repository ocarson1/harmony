import './styles/Sidebar.css'
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";


export default function GenerateSidebar() {

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
                <div className = "filter-info">
                </div>
                <ViewToggler />
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

function ViewToggler() {
    return(
        <div>
            <label className="switch">
                

            </label>
        </div>
    )
}