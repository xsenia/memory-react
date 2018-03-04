import React, { Component } from 'react'; 
import CardsControl from '../CardsControl/CardsControl';
import Button from '../Button/Button';
import logo from '../../Resources/Images/StartGame.png';
import finishLogo from '../../Resources/Images/FinishGame.png';
import Engine from '../../Helpers/engine/engine';


const GameState = {
  finished: 'finished',
  start: 'start',
  game: 'game'
}

class App extends Component { 

  constructor(props,state) {
    super(props);    
    this.state = {
      gameState: GameState.start    
    }; 
    const cardsAmount = 9;
    const gameFinished = () => this.setState({gameState: GameState.finished});    
    const settings = {amount: cardsAmount, timeOut: 1};
    this.engine = new Engine(gameFinished, settings);
    this.settingsTimeout = settings.timeOut;
  }


  startGame = event => {
    event.preventDefault();    
    this.setState({ gameState: GameState.game });
  };



  render() {
    let winScore = this.engine.getWinScore(); 
    const congratulations = (winScore > 0) ? 'Поздравляем!' : 'Попробуете еще раз? '
    

    if (this.state.gameState === GameState.game) {
        return <CardsControl
          engine={this.engine}
          settingsTimeout={this.settingsTimeout}
        /> 
    } else if (this.state.gameState === GameState.finished) {
        return (<div id="intro" className="intro">
          <img src={finishLogo} className="App-logo" alt="Начать игру Start" />
          <h1>{congratulations}</h1>
          <p>Ваш итоговый счет: {winScore}</p>
          <Button
            btnText = 'Еще раз'
            onClick={(еvent) => this.startGame(еvent)}
            dataTid="EndGame-retryGame"
          />
        </div>)
    }
      else {
        return (<div id="intro" className="intro">
        <img src={logo} className="App-logo" alt="Начать игру Start" />
        <h1>Мемори</h1>
        <Button
          btnText = 'Начать игру'
          onClick={(еvent) => this.startGame(еvent)}
          dataTid="NewGame-startGame"
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