import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');

    React.useEffect(() => {
        setUserName(currentUser.name);
        setUserDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleUserNameChange(e) {
        setUserName(e.target.value);
    }

    function handleUserDescriptionChange(e) {
        setUserDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name: userName,
            about: userDescription,
        });
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="profile"
            buttonOnText="Сохранить"
            buttonDisabled={false}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
        >
            <div className="form__text-wrap">
                <input required type="text" value={userName || ""} name="name" className="form__text form__text_type_name" placeholder="Имя"
                    id="name-input" minLength="2" maxLength="40" onChange={handleUserNameChange} />
                <span className="form__error name-input-error"></span>
            </div>
            <div className="form__text-wrap">
                <input required type="text" value={userDescription || ""} name="profession" className="form__text form__text_type_info" placeholder="О себе"
                    id="profession-input" minLength="2" maxLength="200" onChange={handleUserDescriptionChange} />
                <span className="form__error profession-input-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditProfilePopup;