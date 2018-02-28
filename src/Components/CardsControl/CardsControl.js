import React, { Component } from 'react';
import Card from '../Card/Card';
import Score from '../Score/Score';
/*import Button from '../Button/Button';
import logo from '../../Resources/Images/StartGame.png';*/


import cardDeck from '../cardDeck';
import getCardsArray from '../getCardsArray';


class CardsControl extends Component {

  constructor(props,state) {
    super(props);
   /* console.log('props',props);*/
   /*let gameState = this.state.gameState;*/
    this.gameCards = getCardsArray(cardDeck);
    const gameCards = this.gameCards;//колода карт
    this.state = {      
      gameCards: gameCards, //карты в игре пришли из апп
      stateCard: null, //просто первая карта в стейте 
      score: this.props.score,
      guessedPair: 0,
      gameWin: false //??
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


  turnCard = (cardId) => { 

    const cloneGameCards = this.state.gameCards.slice(0);//создаем клон массива карт игры, после первого раза берем измененный массив из стейта

    //если кликнутая карта не угадана
    if (cloneGameCards[cardId].guessed !== true) {      
    
      cloneGameCards[cardId].opened = true;//в массиве у открытой карты  меняем состояние открыто на true 
      const openCard = cloneGameCards[cardId]; //сохраняем открытую карту
      this.setState({
        gameCards: cloneGameCards,//заменяем рандомный массив полученным массивом из тех же карт, но с одной открытой картой      
        stateCard: openCard //сохраняем первую открытую карту
      });
      
      const stateCard = this.state.stateCard;

      /*если в стейте уже есть карта, т.е. если кликнули по второй карте*/
      if ( stateCard !== null && stateCard.guessed === false/* && openCard.guessed === false*/) { 

        if (stateCard.name === openCard.name && stateCard.id !== openCard.id) {

          setTimeout(() => {

            openCard.guessed = true;
            cloneGameCards[stateCard.id].guessed = true;
            //запускаем из движка увеличение отгаданных пар
            this.props.engine.updateScore();
            //получаем из движка кол-во угаданных пар чтобы отправить в стейт
            const guessedPair = this.props.engine.getGuessed();

            const score = this.props.engine.getScore();
            console.log('score: ',score);
            
            this.setState({
                stateCard: null,
                score: score,
                guessedPair: guessedPair
            }/*, () => console.log('CCstate',this.state)*/);

          }, 1000);
        } else if (stateCard.name !== openCard.name && 
          stateCard.id !== openCard.id) {
          let func = () => {

            openCard.opened = false;
            cloneGameCards[stateCard.id].opened = false;
            
            //запускаем из движка увеличение отгаданных пар
            this.props.engine.updateScore(true);
            //получаем из движка кол-во угаданных пар чтобы отправить в стейт
            const guessedPair = this.props.engine.getGuessed();

            const score = this.props.engine.getScore();


            this.setState({
                stateCard: null,
                score: score,
                guessedPair: guessedPair
            }/*, () => console.log('CCCstate',this.state)*/);
          }
          setTimeout(func, 1000);      
        }

      }

    }
  };

  
  
  render(){

    return (<div>

        <Score 
          score = {this.state.score}
        /> 
         
        <div className="cardsWrap">                  
          {this.state.gameCards.map((card, i) => 
              <Card 
                key={card.id} 
                id={card.id} 
                name={card.name} 
                opened={card.opened}
                clickHandle={(cardId) => this.turnCard(cardId)}
                guessed={card.guessed} 
              />
          )}
        </div>
      </div>)

  }

}



export default CardsControl;


