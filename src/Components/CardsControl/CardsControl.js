import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import Card from '../Card/Card';
import cardDeck from '../cardDeck';
import getCardsArray from '../getCardsArray';

class CardsControl extends Component {

  constructor(props,state) {
    super(props);
    const gameCards = getCardsArray(cardDeck);
    this.state = {      
      gameCards: gameCards,
      //firstOpenedCardName: null,
      //firstOpenedCardId: null,
      firstOpenedCard: null
    };
  }

  componentDidMount() {
    this.timerTurnCard();
  }
    
  timerTurnCard = () => {
    setTimeout(() => {      
      const gameCardsClose = () => {
        const cloneGameCards = this.state.gameCards.slice(0);
        //console.log(cloneGameCards);
        const gameCardsClosed = cloneGameCards.map((card, i) => {          
          card.opened = false;
          return card;
        });
        return gameCardsClosed;
      };
      const gameCardsClosed = gameCardsClose();
      //console.log(gameCardsClosed);
      this.setState({gameCards: gameCardsClosed});
    }, 600); 
  }


  turnCard = (cardId) => { 

    let cloneGameCards = this.state.gameCards.slice(0);//создаем клон массива карт игры, после первого раза берем измененный массив из стейта
    cloneGameCards[cardId].opened = true;//в массиве у кликнутой карты  меняем состояние открыто на true
    
    //let firstCardId = cloneGameCards[cardId].id; //сохранили имя кликнутой карты в firstCardName
    //let firstCardName = cloneGameCards[cardId].name; //сохранили имя кликнутой карты в firstCardName
    let firstCard = cloneGameCards[cardId];
    
    //в первом проходе пропускаем

    const firstOpenedCard = this.state.firstOpenedCard;
    if ( firstOpenedCard !== null) {
      if (firstOpenedCard.name === cloneGameCards[cardId].name) {
        cloneGameCards[cardId].guessed = true;
        cloneGameCards[firstOpenedCard.id].guessed = true;
        //console.log(cloneGameCards[cardId]);
      } else {
        cloneGameCards[cardId].opened = false;
        //console.log(cloneGameCards[cardId]);
      }
    }

    this.setState({
      gameCards: cloneGameCards,//заменяем рандомный массив полученным массивом из тех же карт, но с одной открытой картой 
      //firstOpenedCardName: firstCardName,//пересохраняем имя кликнутой карты 
      //firstOpenedCardId: firstCardId,//сохраняем id кликнутой карты
      firstOpenedCard: firstCard //сохраняем первую открытую карту
    }, () => console.log(this.state));
    

  };

  
  
  
  render(){

    return(
      <div className="cardsWrap">        
        {this.state.gameCards.map((card, i) => 
            <Card 
              key={card.id} 
              id={card.id} 
              cardName={card.name} 
              opened={card.opened}
              clickHandle={(cardId) => this.turnCard(cardId)}
              guessed={card.guessed} 
            />            
        )}        
      </div>

    );
  }

}

export default CardsControl;

