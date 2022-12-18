import '../styles/AddToLikedButton.css'

interface buttonProps {
    token: string
    songId: string
}

function AddToLikedButton(props: buttonProps) {

    const addSong = () => {
        let URL = `http://localhost:3232/addLike?token=${props.token}&id=${props.songId}&add=true`;
        fetch(URL)
    }

    return(
        <button className="add-button" onClick={addSong}>ADD TO LIKED</button>
    )
}

export default AddToLikedButton;