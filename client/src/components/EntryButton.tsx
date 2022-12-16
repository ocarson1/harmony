import '../styles/EntryButton.css'
import '../styles/UserEntry.css'
import UserEntry from './UserEntry'

function EntryButton() {

    const openNew = () => {
        var popup = document.getElementById("entryPopup");
        if(popup != null){
            popup.classList.toggle("show");
        }
    }
    
    return(
        <button className="entry-button" onClick={openNew}>+ ADD NEW ENTRY</button>
    )
}

export default EntryButton;