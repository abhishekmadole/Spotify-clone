function MusicCard(props){
    return (
        <div className={`card ${props.isSelected ? "selected" : ""}`} onClick={props.onClick}>
            <img src={props.image} alt={props.title}></img>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            
        </div>
        // <div className="card"
        // onClick={() => {
        //     console.log("Card clicked", props.title);
        //     props.onClick();
        // }}></div>
    );
}

export default MusicCard;