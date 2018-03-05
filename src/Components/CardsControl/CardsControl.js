import React, { Component } from 'react';
import Card from '../Card/Card';
import GameMenu from '../GameMenu/GameMenu';
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
        this.turnOff();
        this.setState({
          firstCard: null,
          //gameCards: cards,
          disabled: false
        }, () => console.log(this.state));
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
    let cards = this.state.gameCards.slice(0);
    const firstCardId = this.state.firstCard.id;
    let secondCard = cards[cardId];
    if (firstCard.name === secondCard.name) {
      cards[firstCardId].guessed = true;
      secondCard.guessed = true;
      this.props.engine.updateScore();
      //this.setState({gameCards: cards});
    } else {
      this.props.engine.updateScore(true);
    }
  }
      
  

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
            : <GameMenu 
              score={score}
              onClick={(еvent) => this.startAgain(еvent)}
             />            
        }
        
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


