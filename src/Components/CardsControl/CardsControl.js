import React, { Component } from 'react';
import Card from '../Card/Card';
import Score from '../Score/Score';
import Button from '../Button/Button';
import getCardsArray from '../../Helpers/getCardsArray/getCardsArray';

class CardsControl extends Component {

  constructor(props,state) {
    super(props);

    const amountSetting = this.props.engine.getAmount();

    let gameCards = getCardsArray(amountSetting);
    this.state = {      
      firstCard: null,
      disabled: false,
      memorizeTimer: this.props.settingsTimeout, 
      gameCards
    };
  }

  componentDidMount() {
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
          setTimeout(() => {
            this.turnOff();
          }, 500);
      }
    }, 1000);
  }

  startAgain = event => {
    event.preventDefault();
    const amountSetting = this.props.engine.getAmount();
    const gameCards = getCardsArray(amountSetting);   
    this.props.engine.setToZero();
      this.setState({ 
        memorizeTimer: this.props.settingsTimeout,
        gameCards: gameCards
      }, () => this.runMemorizeTimer());
  };
 
  turnCard = (cardId) => { 
    const cards = this.state.gameCards.slice(0);
    if (this.state.firstCard) {
      cards[cardId].opened = true;
      this.setState({
        gameCards: cards,
        disabled: true
      });
      setTimeout(() => {
        this.compare(cardId);
        this.setState({
          firstCard: null,
          gameCards: cards,
          disabled: false
        });
      }, 500);      
    } else { 
      cards[cardId].opened = true;
      this.setState({
        firstCard: cards[cardId],
        gameCards: cards
      }); 
    }
  }
    


  compare = (cardId) => {
    const firstCard = this.state.firstCard;
    const secondCard = this.state.gameCards[cardId];
    if (firstCard.id !== secondCard.id && firstCard.name === secondCard.name) {firstCard.guessed = true;
      secondCard.guessed = true;
      this.props.engine.updateScore();
    } else if (firstCard.id !== secondCard.id && firstCard.name !== secondCard.name) {
      this.props.engine.updateScore(true);
    }
    firstCard.opened = false;
    secondCard.opened = false;
  }



  /*compare = (cardId) => {
    const firstCard = this.state.firstCard;
    const cloneFirstCard = {};
    for (var key in firstCard) {
      cloneFirstCard[key] = firstCard[key];
    } 
    console.log(cloneFirstCard);
    const secondCard = this.state.gameCards[cardId];
    if (firstCard.id !== secondCard.id && firstCard.name === secondCard.name) {cloneFirstCard.guessed = true;
      secondCard.guessed = true;
      this.props.engine.updateScore();
    } else if (firstCard.id !== secondCard.id && firstCard.name !== secondCard.name) {
      this.props.engine.updateScore(true);
    } 
    //firstCard.opened = false;
    cloneFirstCard.opened = false;
    secondCard.opened = false;
  }*/
  

  renderMemorizeTimer() {
    return (
      <div className="timerWrap">
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
      <div className="b-cards-control">
        {this.state.memorizeTimer != null
            ? this.renderMemorizeTimer()
            : <div className="gameMenu">
                <Score score = {score} />
                <Button
                  btnText = 'Начать заново'
                  onClick={(еvent) => this.startAgain(еvent)}
                  dataTid='Menu-newGame'
                />
              </div>
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
                dataTid={card.opened ? 'Card' : 'Card-flipped'}
              />
          )}
        </div>
      </div>
    )

  }

}



export default CardsControl;


