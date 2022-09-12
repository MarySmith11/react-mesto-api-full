function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image ${props.isOpen && props.card.link ? 'popup_opened' : ''}`}>
            <div className="popup__image-container">
                <img src={props.card.link} alt={props.card.name} className="popup__image" />
                <p className="popup__text">{props.card.name}</p>
                <button type="button" className="popup__close-button  popup__close-button_image" aria-label="Закрыть" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup;