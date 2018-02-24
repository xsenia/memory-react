import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import Card from '../Card/Card';
import cardDeck from '../cardDeck';
import getCardsArray from '../getCardsArray';
import Score from '../Score/Score';

class CardsControl extends Component {

  constructor(props,state) {
    super(props);
    const gameCards = getCardsArray(cardDeck);    
    this.state = {      
      gameCards: gameCards,
      firstOpenedCard: null,
      score: 0
    };
  }

  componentDidMount() {
    this.timerTurnCard();
  }
    
  timerTurnCard = () => {
    setTimeout(() => {      
      const gameCardsClose = () => {
        const cloneGameCards = this.state.gameCards.slice(0);
        const gameCardsClosed = cloneGameCards.map((card, i) => {          
          card.opened = false;
          return card;
        });
        return gameCardsClosed;
      };
      const gameCardsClosed = gameCardsClose();
      this.setState({gameCards: gameCardsClosed});
    }, 5000); 
  }

  scoreWin = () => {
    const score = this.state.score;
    const noguessedPair = this.state.gameCards.length / 2;    
    const guessedPair = this.state.gameCards.length / 2 - noguessedPair;
    const scoreWin = score + (guessedPair + 1)*42;
    return scoreWin;
  }

  scoreLost = () => {
    const score = this.state.score;    
    const scoreLost = score - 42;
    return scoreLost;
  }

  turnCard = (cardId) => { 



    const cloneGameCards = this.state.gameCards.slice(0);//создаем клон массива карт игры, после первого раза берем измененный массив из стейта
    cloneGameCards[cardId].opened = true;//в массиве у открытой карты  меняем состояние открыто на true 
    const openCard = cloneGameCards[cardId]; //сохраняем открытую карту в стейт
    this.setState({
      gameCards: cloneGameCards,//заменяем рандомный массив полученным массивом из тех же карт, но с одной открытой картой      
      firstOpenedCard: openCard //сохраняем первую открытую карту
    });
    
    const firstOpenedCard = this.state.firstOpenedCard;
    if ( firstOpenedCard !== null) {

      if (firstOpenedCard.name === cloneGameCards[cardId].name) {
        setTimeout(() => {
          cloneGameCards[cardId].guessed = true;
          cloneGameCards[firstOpenedCard.id].guessed = true;
          const score = this.scoreWin();
          this.setState({
            firstOpenedCard: null,
            score: score
          });
          
        }, 1000);
      } else {
        setTimeout(() => {
          cloneGameCards[cardId].opened = false;
          cloneGameCards[firstOpenedCard.id].opened = false;
          const score = this.scoreLost();
          this.setState({
            firstOpenedCard: null,
            score: score
          });
        }, 1000);      
      }

    }


  };

  
  render(){

    return(
      <div>
        <Score 
          score = {this.state.score}
        /> 
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
      </div>

    );
  }

}

export default CardsControl;


