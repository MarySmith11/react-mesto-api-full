import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `cards__basket-button ${isOwn ? 'cards__basket-button' : 'cards__basket-button_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `cards__like-button ${isLiked ? 'cards__like-button_active' : 'cards__like-button'}`;

  function handleLikeClick() { 
    props.onCardLike(props.card); 
  } 

  function handleClick() { 
    props.onCardClick(props.card); 
  }
  
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  
  return (
    <article className="cards__element">
      <img src={props.card.link} alt={props.card.name} className="cards__picture" onClick={handleClick}/>
      <button type="button" className={cardDeleteButtonClassName} aria-label="Удалить" onClick={handleDeleteClick}></button>
      <div className="cards__info">
        <h2 className="cards__title">{props.card.name}</h2>
        <div className="cards__like">
          <button type="button" className={cardLikeButtonClassName} aria-label="Мне нравится" onClick={handleLikeClick}></button>
          <p className="cards__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;