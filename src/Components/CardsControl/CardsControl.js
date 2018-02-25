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
      stateCard: null,
      score: 0,
      guessedPair: 0
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
    }, 1000); 
  }

  scoreWin = () => {
    const score = this.state.score;
    let guessedPair = this.state.guessedPair;
    const noGuessedPair = this.state.gameCards.length/2 - guessedPair;
    const scoreWin = score + (noGuessedPair)*42;
    guessedPair = guessedPair + 1;    
    const resultWin = [scoreWin, guessedPair];
    return resultWin;
  }

  scoreLost = () => {
    const score = this.state.score;
    let guessedPair = this.state.guessedPair;
    const scoreLost = score - guessedPair*42;
    const resultLost = [scoreLost, guessedPair];
    return resultLost;
  }

  turnCard = (cardId) => { 

    const cloneGameCards = this.state.gameCards.slice(0);//создаем клон массива карт игры, после первого раза берем измененный массив из стейта

    //если кликнутая карта не угадана
    if (cloneGameCards[cardId].guessed !== true) {
      
    
      cloneGameCards[cardId].opened = true;//в массиве у открытой карты  меняем состояние открыто на true 
      const openCard = cloneGameCards[cardId]; //сохраняем открытую карту в стейт
      this.setState({
        gameCards: cloneGameCards,//заменяем рандомный массив полученным массивом из тех же карт, но с одной открытой картой      
        stateCard: openCard //сохраняем первую открытую карту
      });
      
      const stateCard = this.state.stateCard;


      /*если в стейте уже есть карта, т.е. если кликнули по второй карте*/
      if ( stateCard !== null && stateCard.guessed === false/* && openCard.guessed === false*/) { 

        if (
          stateCard.name === openCard.name && 
          stateCard.id !== openCard.id
        ) {
          setTimeout(() => {

            openCard.guessed = true;
            cloneGameCards[stateCard.id].guessed = true;

            const score = this.scoreWin()[0];
            const guessedPair = this.scoreWin()[1];
            this.setState({
                stateCard: null,
                score: score,
                guessedPair: guessedPair
            });
            if (this.state.guessedPair === this.state.gameCards.length/2) {
              alert('Вы выиграли!');
            }
            
          }, 1000);
        } else if (
          stateCard.name !== openCard.name && 
          stateCard.id !== openCard.id
        ) {
          setTimeout(() => {

            openCard.opened = false;
            cloneGameCards[stateCard.id].opened = false;
            
            const score = this.scoreLost()[0];
            const guessedPair = this.scoreLost()[1];
            this.setState({
                stateCard: null,
                score: score,
                guessedPair: guessedPair
            });
          }, 1000);      
        }

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


