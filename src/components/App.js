
// import react and usestate (allows not to write React.useState)
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForms';
import ImagePopup from './ImagePopup';
import { currentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTools from './InfoTools';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth.js'
import '../blocks/auth/auth.css'



function App() {
  // тут я пишу 12код

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState('')
  const [signupError, setSignupError] = useState('')
  const [signinError, setSigninError] = useState('')

  const navigate = useNavigate();

  // useEffect(() => {
  //   auth.authtorize(token)
  //     .then(() => {
  //       setIsLoggedIn(true);
  //       navigate("/");

  //     })
  // }, [token])



  function registerUser({ email, password }) {
    auth.signupUser(email, password)
      .then((res) => {
        handleInfotoolTipPopup();
        setIsInfotoolTipSuccess(true);
        navigate('/signin')
        console.log(res)

      })
      .catch((err) => {
        handleInfotoolTipPopup();
        setIsInfotoolTipSuccess(false);
        console.log(err)
        setSignupError('Ошибка регистрации, попробуйте еще раз!')
      })
  }

  function loginUser({ email, password }) {
    auth.signinUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setToken(res.token)
        console.log(res.token);
        setIsLoggedIn(true);
        navigate('/')
      })
  }



  // function loginUser({ email, password }) {
  //   auth.signinUser(email, password)
  //     .then((res) => {
  //       localStorage.setItem("jwt", res.token);
  //       setToken(res.jwt);
  //       setIsLoggedIn(true);
  //       navigate('/')
  //     })
  //     .catch((err) => console.log(err))
  // }

  // 


  // тут я пишу код
  const [currentUser, setCurrentUser] = useState('')

  const [cards, setCards] = useState([])


  // здесь опен попап кард

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => { setSelectedCard(card) }


  // хуки стейта
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isInfotoolTipPopupOpen, setIsInfotoolTipPopupOpen] = useState(false);

  const [isInfotoolTipSuccess, setIsInfotoolTipSuccess] = useState(false);





  useEffect(() => {
    Promise.all([api.getUserProfile()])
      .then(([userData]) => {
        setCurrentUser(userData)
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }, []);



  useEffect(() => {
    Promise.all([api.getInitialCards()])
      .then(([cardData]) => {
        setCards(cardData)
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }, []);




  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }


  function handleCardDelete(card) {
    api.deleteCard(card._id).then((newCard) => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }

  function handleUpdateUser(userData) {
    api.editProfile(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData)
        closeAllPopups();

      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }

  // функция апдейта аватара

  function handleUpdateAvatar(avatarData) {
    api.updateAvatar(avatarData)
      .then((newAvatar) => {
        setCurrentUser(newAvatar)
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }

  //  ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ 

  function handleAddPlaceSubmit(cardData) {
    api.addCardToServer(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))

  }


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  };


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  };

  function handleInfotoolTipPopup() {
    setIsInfotoolTipPopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfotoolTipPopupOpen(false);
  }


  return (
    <currentUserContext.Provider value={currentUser}>

      <div className="page">

        {/* <Header /> */}
        <Routes>


          <Route path='/' element={
            <>
              <ProtectedRoute
                component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards} />
              <Footer />
            </>
          } />

          <Route
            path='/signup'
            element={
              <Register onUserRegister={registerUser}>
                <Header
                  textLink={'Войти'}
                  path={'/signin'}
                ></Header>
              </Register>
            }
          />

          <Route
            path='/signin'
            element={
              <Login onLogin={loginUser}>
                <Header
                  textLink={'Регистрация'}
                  path={'/signup'}
                ></Header>
              </Login>
            }
          />

          <Route path='*' element={isLoggedIn ? <Navigate to='/' /> : <Navigate to='/signin' />} />

        </Routes>



        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        >

        </ImagePopup>


        {/* ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />


        {/* ПОПАП ADD КАРТОЧКИ */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />


        {/* ПОПАП ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ */}
        <PopupWithForm
          title='Вы уверены?'
          name='popup_confirm-delete'
          formName='confirm'
          buttonText='Да'
          onClose={closeAllPopups}
        >

        </PopupWithForm>


        {/*  ПОПАП ОБНОВЛЕНИЯ АВАТАРА*/}

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />


        <InfoTools
          isOpen={isInfotoolTipPopupOpen}
          onClose={closeAllPopups}
          name={'popup_infotools'}
          isSuccess={isInfotoolTipSuccess}
        ></InfoTools>

      </div>


    </ currentUserContext.Provider >
  );
}

export default App;
