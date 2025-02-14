import React from 'react';
import AddPlacePopup from "./AddPlacePopup";

import "../blocks/card/card.css"

function AddCardButton() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closePopups() {
    setIsAddPlacePopupOpen(false);
  }

  return (
    <>
      <button className="profile__add-button" type="button" onClick={handleAddPlaceClick}></button>
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closePopups}
       />
    </>
  );
}

export default AddCardButton;
