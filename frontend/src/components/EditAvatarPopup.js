import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {

  const avatarRef = React.createRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  const clearInputValue = () => {
    avatarRef.current.value = '';
  }

  React.useEffect(() => {
    clearInputValue();
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonOnText="Сохранить"
      buttonDisabled={false}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isOpen={props.isOpen}
    >
      <div className="form__text-wrap">
        <input required type="url" ref={avatarRef} name="avatar" className="form__text form__text_type_avatar"
          placeholder="Ссылка на картинку" id="avatar-input" />
        <span className="form__error avatar-input-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;