import React, { Suspense, lazy } from 'react';
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

import "../blocks/profile/profile.css"

const AddCardButton = lazy(() => import('feed/AddCardButton').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
)

function Profile({ user }) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(user);

  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` }

  function handleUpdateUser(userUpdate) {
    api
      .setUserInfo(userUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closePopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarUpdate) {
    api
      .setUserAvatar(avatarUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closePopups();
      })
      .catch((err) => console.log(err));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  const closePopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }

  React.useEffect(() => {
    addEventListener("all-popups-close", closePopups);
    return () => removeEventListener("all-popups-close", closePopups)
  }, []);

  React.useEffect(() => {
    setCurrentUser(user)
  }, [user]);

  return (
    <>
      <section className="profile page__section">
        <div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}></div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <Suspense>
          <AddCardButton />
        </Suspense>
      </section>
      <EditProfilePopup
        currentUser={currentUser}
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        onClose={closePopups}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={handleUpdateAvatar}
        onClose={closePopups}
      />
    </>
  );
}

export default Profile;
