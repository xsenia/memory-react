import React, { Component } from 'react'; 
/*import ButtonStart from '../ButtonStart/ButtonStart';*/
import CardsControl from '../CardsControl/CardsControl';
import Button from '../Button/Button';
import logo from '../../Resources/Images/StartGame.png';
import Engine from '../engine';

class App extends Component { 

  constructor(props,state) {
    super(props);    
    this.state = {
      gameState: 'start' // 'start', 'game', 'finished'
    };
    
    
    let cardsAmount = 4/2;

    const gameFinished = () => {this.setState({gameState: 'finished'})};

    const settings = {amount: cardsAmount, timeOut: 5};
    this.engine = new Engine(gameFinished, settings);
  }


  startGame = event => {
    event.preventDefault();    
    this.setState({ gameState: 'game' }/*, () => console.log('app game state ',this.state)*/);
  };



  render() {  
    //получить из движка очки и передать в кардс контрол
    let score = this.engine.getScore(); 
    const gameCards = this.gameCards;

    let guessedPair = this.engine.getGuessed();

    if (this.state.gameState === 'game') {
        return <CardsControl
        engine={this.engine}
        score={score}
        gameCards={gameCards}
        guessedPair = {guessedPair}
      /> 
    } else if (this.state.gameState === 'finished') {
        return (<div id="intro" className="intro">
          <img src={logo} className="App-logo" alt="Начать игру Start" />
          <h1>Финиш</h1>
          <p>Ваши очки: {score}</p>
          <Button
            btnText = 'Начать заново'
            onClick={(еvent) => this.startGame(еvent)}
          />
        </div>)
    }
      else {
        return (<div id="intro" className="intro">
        <img src={logo} className="App-logo" alt="Начать игру Start" />
        <h1>Мемори</h1>
        <Button
          btnText = 'Старт'
          onClick={(еvent) => this.startGame(еvent)}
        />
      </div>)
    }



  }
}

App.defaultProps = {
  btnText: 'Старт',
  winScore: 0 //null
};

export default App;