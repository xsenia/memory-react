import React, { Component } from 'react';
import Card from '../Card/Card';
import Score from '../Score/Score';
import getCardsArray from '../getCardsArray';
import Timer from '../timer';

class CardsControl extends Component {

  constructor(props,state) {
    super(props);
    //console.log(props);

    const amountSetting = this.props.engine.getAmount();

    let gameCards = getCardsArray(amountSetting);
    this.state = {      
      gameCards, //gameCards: gameCards,
      firstCard: null, //просто первая карта в стейте
      disabled: false,
      memorizeTimer: this.props.settingsTimeout 
    };

    /*таймер*/
    const finishCallback = this.turnOff;
    let timeout = 500;
    this.timer = new Timer(finishCallback, timeout);
  }


  /*----------------переворот карт в начале игры------------------*/
  componentDidMount() {
    //this.timer.start(this.turnOff);
    this.runMemorizeTimer();
  }  
  turnOff = () => {
    const cards = this.state.gameCards;
    const gameCardsClosed = cards.map((card, i) => {
      card.opened = false;
      return card;
    });
    this.setState({gameCards: gameCardsClosed});
  }
  /*----------------//переворот карт в начале игры------------------*/

   

  runMemorizeTimer() {
      let counter = this.state.memorizeTimer;
      const timer = setInterval(() => {
          if (counter > 1) {
              counter--;
              this.setState({memorizeTimer: counter});
          }
          else {
              clearInterval(timer);
              this.setState({memorizeTimer: null});
              this.timer.start(this.turnOff);
          }
      }, 1000)
  }




  /*-----------------------переворот карты по кулику--------------------------*/
  turnCard = (cardId) => { 
    const cards = this.state.gameCards;//кешируем массив карт игры, а после первого раза берем измененный массив из стейта  
    if (this.state.firstCard) { //если это уже вторая карта
      cards[cardId].opened = true; //делаем ее открытой
      this.setState({
        gameCards: cards,
        disabled: true
      });
      setTimeout(() => {
      this.compare(cardId);//сравниваем карты этой функцией
      this.setState({ // после сравнения обнуляем первую карту в стейте
        firstCard: null,
        gameCards: cards,
        disabled: false
      });
      }, 500);
      //this.timer.start(this.turnOff);
    } else { //если это первая карта, делаем ее отрытой, сетим ее в стейт, сетим новый массив карт 
      cards[cardId].opened = true;
      this.setState({
        firstCard: cards[cardId],
        gameCards: cards
      }); 
    }
  }
  /*-----------------------//переворот карты по клику--------------------------*/


  /*-----------------------сравнение карт--------------------------*/
  compare = (cardId) => {
    const firstCard = this.state.firstCard; //Первая карта из стейта
    const secondCard = this.state.gameCards[cardId]; //Вторая карта только что кликнутая
    /*console.log(firstCard); console.log(secondCard);*/
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
  /*-----------------------//сравнение карт--------------------------*/

  renderMemorizeTimer() {
    return (
      <div>
        До начала игры осталось:
        &nbsp;
        {this.state.memorizeTimer}
        &nbsp; сек
      </div>
    );
  }
  

  
  
  render(){
    let score = this.props.engine.getScore();

    return (
      <div>
        {this.state.memorizeTimer != null
            ? this.renderMemorizeTimer()
            : <div><Score score = {score} /></div>
        }
        
        <br />
        <div className="cardsWrap">                  
          {this.state.gameCards.map((card, i) => 
              <Card 
                key={card.id} 
                id={card.id} 
                name={card.name} 
                opened={card.opened}
                clickHandle={(cardId) => this.turnCard(cardId)}
                guessed={card.guessed} 
                disabled={this.state.disabled}
              />
          )}
        </div>
      </div>
    )

  }

}



export default CardsControl;


