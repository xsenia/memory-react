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
    }, 5000); 
  }


  turnCard = (cardId) => { 

    const cloneGameCards = this.state.gameCards.slice(0);//создаем клон массива карт игры, после первого раза берем измененный массив из стейта
    cloneGameCards[cardId].opened = true;//в массиве у открытой карты  меняем состояние открыто на true 
    const openCard = cloneGameCards[cardId]; //сохраняем открытую карту в стейт
    this.setState({
      gameCards: cloneGameCards,//заменяем рандомный массив полученным массивом из тех же карт, но с одной открытой картой      
      firstOpenedCard: openCard //сохраняем первую открытую карту
    }/*, () => console.log(this.state)*/);

    /*console.log('state:');
    console.log(this.state.firstOpenedCard);
    console.log('openCard:');
    console.log(openCard);*/
    
    const firstOpenedCard = this.state.firstOpenedCard;
    if ( firstOpenedCard !== null) {

      if (firstOpenedCard.name === cloneGameCards[cardId].name) {

        cloneGameCards[cardId].guessed = true;
        cloneGameCards[firstOpenedCard.id].guessed = true;
        this.setState({firstOpenedCard: null});

      } else {
        setTimeout(() => {
          cloneGameCards[cardId].opened = false;
          cloneGameCards[firstOpenedCard.id].opened = false;
          this.setState({firstOpenedCard: null});
        }, 1000);      
      }

    }


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


