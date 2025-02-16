import React from 'react';
import PopupWithForm from './PopupWithForm';
import api from "../utils/api";
import Card from './Card';
import ImagePopup from "./ImagePopup";

import "../blocks/card/card.css"
import "../blocks/places/places.css"

function CardsList({ user }) {
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);

  React.useEffect(() => {
    api
      .getCardList()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  const onCardAdded = (event) => {
    setCards((prevCards) => [event.detail.newCard, ...prevCards]);
  }

  React.useEffect(() => {
    addEventListener("card-added", onCardAdded);
    return () => removeEventListener("card-added", onCardAdded)
  }, []);

  return (
    <>
      <section className="places page__section">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              setSelectedCard={setSelectedCard}
              setCards={setCards}
              currentUser={user}
            />
          ))}
        </ul>
      </section>
      <ImagePopup card={selectedCard} onClose={() => setSelectedCard(null)} />
      <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
    </>
  );
}

export default CardsList;
