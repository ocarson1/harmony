import '../styles/EntryButton.css'
import '../styles/UserEntry.css'
import UserEntry from './UserEntry'

interface LogInProps {
    href: string
    clearance: boolean
}

function EntryButton() {

    const openNew = () => {
        var popup = document.getElementById("entryPopup");
        if(popup != null){
            popup.classList.toggle("show");
        }
    }
    
    return(
        <div>
            <button className="entry-button" onClick={openNew}>+ ADD NEW ENTRY</button>
        </div>
    )
}

export default EntryButton;