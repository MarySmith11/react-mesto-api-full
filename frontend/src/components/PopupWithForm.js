function PopupWithForm({ name, isOpen, onSubmit, title, children, buttonDisabled, onClose, buttonOnText }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <form action="#" className="form" name={`${name}-profile`} onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className='form__button' disabled={buttonDisabled}>{buttonOnText}</button>
                </form>
                <button type="button" className="popup__close-button" onClick={onClose} aria-label="Закрыть"></button>
            </div>
        </div>
    )
}

export default PopupWithForm;