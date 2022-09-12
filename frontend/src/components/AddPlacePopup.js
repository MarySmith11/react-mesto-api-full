import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace(
            {
                name,
                link
            }
        );
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    return (
        <PopupWithForm
            title="Новое место"
            name="place"
            buttonOnText="Создать"
            buttonDisabled={false}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
        >
            <div className="form__text-wrap">
                <input required type="text" value={name || ""} onChange={handleNameChange} name="name" className="form__text form__text_type_title-name" placeholder="Название"
                    id="place-title-input" minLength="2" maxLength="30" />
                <span className="form__error place-title-input-error"></span>
            </div>
            <div className="form__text-wrap">
                <input required type="url" value={link || ""} onChange={handleLinkChange} name="link" className="form__text form__text_type_link"
                    placeholder="Ссылка на картинку" id="link-input" />
                <span className="form__error link-input-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;