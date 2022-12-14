import React from 'react';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import apiInstance from '../utils/api';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {

  /*стейт для блокировки отрисовки контента до проверки токена */
  const [tokenChecked, setTokenChecked] = React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const [isInfoToolTipOpened, setIsInfoToolTipOpened] = React.useState(false);
  const [registerMessage, setRegisterMessage] = React.useState("");
  const [registerSuccessfully, setRegisterSuccessfully] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);

  const history = useHistory();

  const handleTokenCheck = () => { 
    auth.checkToken()
      .then((res) => { 
        if (res.data) {
          setCurrentUser(res.data); 
          setLoggedIn(true); 
          setTokenChecked(true); 
          history.push('/'); 
        } else { 
          setLoggedIn(false); 
          setTokenChecked(true); 
          if(history.location.pathname !== '/sign-up'){ 
            history.push('/sign-in'); 
          } 
        } 
      }) 
      .catch(err => console.log(err)); 
  }

  React.useEffect(() => { 
    handleTokenCheck(); 
  }, [history.location.pathname]); 

  React.useEffect(() => {
    apiInstance.getUserInfo().then((res) => {
      setCurrentUser(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsInfoToolTipOpened(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const handleUpdateUser = (userData) => {
    apiInstance.updateUserProfile(userData).then((res) => {
      setCurrentUser(res.data);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(userData) {
    apiInstance.updateUserAvatar(userData.avatar)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    apiInstance.getInitialCards().then((res) => {
      setCards(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [loggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.includes(currentUser._id);
    const method = isLiked ? 'DELETE' : 'PUT';
    // Отправляем запрос в API и получаем обновлённые данные карточки
    apiInstance.likeAction(card._id, method).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
    });
  }

  function handleCardDelete(card) {
    apiInstance.removeCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(newCard) {
    apiInstance.addNewCard(newCard)
      .then((res) => {
        setCards([res.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    if (!email || !password) { 
      return; 
    } 

    auth.login(email, password) 
      .then(() => { 
          history.push('/'); 
      }) 
      .catch(err => { 
        console.log(err); 
      }); 
  }

  function handleRegister(email, password) {
    if (!email || !password) {
      return;
    }
    auth.register(email, password)
      .then(() => {
        setRegisterSuccessfully(true);
        setRegisterMessage('Вы успешно зарегистрировались!');
      })
      .catch(err => {
        setRegisterSuccessfully(false);
        setRegisterMessage(err);
      })
      .finally(() => {
        setIsInfoToolTipOpened(true);
      })
  }

  function handleLogout() { 
    setLoggedIn(false);    
    document.cookie = 'token=; Max-Age=-99999999;'; 
  } 

  return (
    tokenChecked && <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} userEmail={currentUser.email} handleLogout={handleLogout} />
      <Switch>
        <ProtectedRoute component={Main} exact path="/" loggedIn={loggedIn} cards={cards} onCardDelete={handleCardDelete} onCardLike={handleCardLike} onEditProfile={() => { setIsEditProfilePopupOpen(true) }} onAddPlace={() => { setIsAddPlacePopupOpen(true) }} onEditAvatar={() => { setIsEditAvatarPopupOpen(true) }} onCardClick={handleCardClick} />
        <Route path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
        <Route path="/sign-up">
          <Register onRegister={handleRegister} />
          <InfoToolTip isOpen={isInfoToolTipOpened} resultText={registerMessage} isSuccess={registerSuccessfully} onClose={closeAllPopups} />
        </Route>
      </Switch>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      <PopupWithForm
        title="Вы уверены?"
        name="confirm"
        buttonOnText="Да"
        onClose={closeAllPopups}
        buttonOnClose={false}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
