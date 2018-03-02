import React, { Component } from 'react'; 
/*import ButtonStart from '../ButtonStart/ButtonStart';*/
import CardsControl from '../CardsControl/CardsControl';
import Button from '../Button/Button';
import logo from '../../Resources/Images/StartGame.png';
import Engine from '../engine';


const GameState = {
  finished: 'finished',
  start: 'start',
  game: 'game'
}

class App extends Component { 

  constructor(props,state) {
    super(props);    
    this.state = {
      gameState: GameState.start // GameState.game, GameState.finished    
    }; 
    const cardsAmount = 9; //9 проверить, чтоб не больше
    const gameFinished = () => this.setState({gameState: 'finished'});
    const settings = {amount: cardsAmount, timeOut: 9};
    this.engine = new Engine(gameFinished, settings);
    this.settingsTimeout = settings.timeOut;
  }


  startGame = event => {
    event.preventDefault();    
    this.setState({ gameState: GameState.game }/*, () => console.log('app game state ',this.state)*/);
  };



  render() {  
    //получить из движка очки и передать в третий экран    
    let winScore = this.engine.getWinScore(); 
    

    if (this.state.gameState === GameState.game) {
        return <CardsControl
          engine={this.engine}
          settingsTimeout={this.settingsTimeout}
        /> 
    } else if (this.state.gameState === GameState.finished) {
        return (<div id="intro" className="intro">
          <img src={logo} className="App-logo" alt="Начать игру Start" />
          <h1>Финиш</h1>
          <p>Ваши очки: {winScore}</p>
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