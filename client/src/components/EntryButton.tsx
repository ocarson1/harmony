import { Dispatch, SetStateAction } from 'react';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import '../styles/EntryButton.css'
import UserEntry from './UserEntry';

interface EntryProps {
    href: string
    clearance: boolean
}

function EntryButton() {

    const openNew = () => {
        return(
            <UserEntry></UserEntry>
        )
    }

    return(
        <button className="entry-button" onClick={openNew}>+ ADD NEW ENTRY</button>
    )
}

export default EntryButton;