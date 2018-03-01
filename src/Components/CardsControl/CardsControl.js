import React, { Component } from 'react';
import Card from '../Card/Card';
import Score from '../Score/Score';
import getCardsArray from '../getCardsArray';
/*import cardDeck from '../cardDeck';*/
import Timer from '../timer';

class CardsControl extends Component {

  constructor(props,state) {
    super(props);    
    let gameCards = getCardsArray();
    this.state = {      
      gameCards, //gameCards: gameCards,
      firstCard: null //просто первая карта в стейте 
    };

    /*таймер*/
    const finishCallback = this.turnOff;
    const timeout = 10;
    this.timer = new Timer(finishCallback, timeout);
  }


  componentDidMount() {
    this.timer.start(this.turnOff);
  }
  
  turnOff = () => {
    const cards = this.state.gameCards;
    const gameCardsClosed = cards.map((card, i) => {
      card.opened = false;
      return card;
    });
    this.setState({gameCards: gameCardsClosed});
  }
   
  

  turnCard = (cardId) => { 
    const cards = this.state.gameCards;//кешируем массив карт игры, после первого раза берем измененный массив из стейта  
    if (this.state.firstCard) { //вторая карта
      cards[cardId].opened = true;
      this.compare(cardId);//вот она, функция сравнения
      let turnTimeout = () => { 
        this.setState({
          firstCard: null,
          gameCards: cards
        }); 
      }
      setTimeout(turnTimeout, 100);
    } else { //первая карта
      cards[cardId].opened = true;
      this.setState({
        firstCard: cards[cardId],
        gameCards: cards
      }); 
    }
  }

  compare = (cardId) => {
    const firstCard = this.state.firstCard; //Первая карта из стейта
    const secondCard = this.state.gameCards[cardId]; //Вторая карта только что кликнутая
    /*console.log(firstCard);
    console.log(secondCard);*/
    if (firstCard.id !== secondCard.id && firstCard.name === secondCard.name) {
      firstCard.guessed = true;
      secondCard.guessed = true;      
      this.props.engine.updateScore();//запускаем из движка увеличение очков и отгаданных пар
    } else if (firstCard.id !== secondCard.id && firstCard.name !== secondCard.name) {
      this.props.engine.updateScore(true);//запускаем из движка уменьшение очков 
    }
    firstCard.opened = false;
    secondCard.opened = false;
  }

  

  
  
  render(){
    let score = this.props.engine.getScore();

    return (
      <div>
        <Score score = {score} /> 

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
      </div>
    )

  }

}



export default CardsControl;


