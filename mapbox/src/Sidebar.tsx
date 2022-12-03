import './styles/Sidebar.css'


export default function GenerateSidebar() {

    return (
        <div className="sidebar">
            <div className="view-tab">
                <p>VIEW</p>
                <EntryButton />
                <div className = "filter-by">
                    FILTER BY...
                </div>
                <div className = "filter-info">
                </div>
                <ViewToggler />
        

            </div>
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