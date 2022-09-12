import React from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-wrap" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
                </div>
                <div className="profile__info">
                    <div className="profile__name-wrap">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button onClick={props.onEditProfile} type="button" className="profile__edit-button" aria-label="Редактировать"></button>
                    </div>
                    <p className="profile__profession">{currentUser.about}</p>
                </div>
                <button onClick={props.onAddPlace} type="button" className="profile__add-button" aria-label="Добавить"></button>
            </section>

            <section className="cards">
                {props.cards.map((card) => (
                    <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                ))}
            </section>
        </main>
    )
}

export default Main;