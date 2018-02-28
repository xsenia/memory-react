import React, { Component } from 'react'; 
/*import ButtonStart from '../ButtonStart/ButtonStart';*/
import CardsControl from '../CardsControl/CardsControl';
import Button from '../Button/Button';
import logo from '../../Resources/Images/StartGame.png';
import Engine from '../engine';

import cardDeck from '../cardDeck';
import getCardsArray from '../getCardsArray';

class App extends Component { 

  constructor(props,state) {
    super(props);    
    this.state = {
      gameBegun: false,
      gameWin: false 
    };
    this.gameCards = getCardsArray(cardDeck);

    const gameCards = this.gameCards;
    let cardsAmount = gameCards.length;
    let arg001 = "Hello"; //tmp
    this.engine = new Engine(arg001, cardsAmount);
  }

  
  

  startGame = event => {
    event.preventDefault();
    this.setState({ gameBegun: !this.state.gameBegun }/*, () => console.log(this.state)*/);
  };

  render() {

    //получить из инжина очки
    let score = this.engine.getScore(); 
    const gameCards = this.gameCards;

    let guessedPair = this.engine.getGuessed(); 
    
    


    const winScore= this.props.winScore;
    const winScoreStr = winScore ? `Ваши очки ${winScore}` : null;

    return this.state.gameBegun 
      ? 
            <CardsControl
              engine={this.engine}
              score={score}
              gameCards={gameCards}
              guessedPair = {guessedPair}
            />
          
      : (
        
            <div id="intro" className="intro">
              <img src={logo} className="App-logo" alt="Начать игру Start" />
              <h1>Мемори</h1>
              
              <p>{winScoreStr}</p>            
              
              <Button
                btnText = 'Старт'
                onClick={(еvent) => this.startGame(еvent)}
              />
              
              

            </div>
            
      );



  }
}

App.defaultProps = {
  btnText: 'Старт',
  winScore: 0 //null
};

export default App;