import React, { Component } from 'react'; 
import CardsControl from '../CardsControl/CardsControl';
import Button from '../Button/Button';
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
      gameState: GameState.start,
      cardsAmount: 9,
      timeOut: 5,
      cardsAmountNotCorrect: false
    }; 
  }

  initEngine() {
    const cardsAmount = this.state.cardsAmount;
    const timeOut = this.state.timeOut;
    const settings = {amount: cardsAmount, timeOut: timeOut};
    const gameFinished = () => this.setState({gameState: GameState.finished});
    this.engine = new Engine(gameFinished, settings);
  }

  checkAmountSetting(value) {
    let numValue = parseInt(value,10);
    this.setState({
      cardsAmountNotCorrect: !!(numValue < 1) || numValue > 26,
      cardsAmount: numValue});
  }

  checkTimesSetting(value) {            
    let valueTime = parseInt(value,10);
    this.setState({ 
      cardsAmountNotCorrect: !!(valueTime < 1) || valueTime > 50,
      timeOut: valueTime 
    });
  }
  

  startGame = event => {
    event.preventDefault();    
    this.setState({ gameState: GameState.game });
  };




  renderGameSettings() {
    const inputProps = {
        type: 'text',
        style: {marginRight: 10, width: 60}
      };
    const labelStyle = this.state.cardsAmountNotCorrect ? 'warningError' : 'warning';
    let amount = this.state.cardsAmount;
    let timeOut = this.state.timeOut;

    return (
      <div className="b-settings">
        <div className="row">
          <label className={labelStyle}>Количество пар карт: <span className="warn">но не больше 26!</span> </label>
          <input {...inputProps}
            value={amount || ''}
            onChange={(e) => this.checkAmountSetting(e.target.value)}
          />
        </div>
        <div className="row">
          <label className={labelStyle}>Время на запоминание: <span className="warn">не больше 50!</span> </label>
          <input {...inputProps}
            value={timeOut || ''}
            onChange={(e) => this.checkTimesSetting(e.target.value)}
          />
        </div>
      </div>
    )
  }


  renderStart() {
    return (
      <div id="intro" className="intro">
        <div className="startGameImage"><div></div></div>        
        <h1>Мемори</h1>
        {this.renderGameSettings()}
        <Button
          disabled={this.state.cardsAmountNotCorrect}
          btnText = 'Начать игру'
          onClick={(еvent) => {this.startGame(еvent);this.initEngine();}}
          dataTid="NewGame-startGame"
        />
      </div>
    )
  }

  renderFinish() {
    let winScore = this.engine.getWinScore(); 
    const congratulations = (winScore > 0) ? 'Поздравляем!' : 'Попробуете еще раз? ';
    return (
      <div id="intro" className="intro">
        <div className="finishGameImage"><div></div></div>
        <h1>{congratulations}</h1>
        <p>Ваш итоговый счет: {winScore}</p>
        <Button
          btnText = 'Еще раз'
          onClick={(еvent) => this.startGame(еvent)}
          dataTid="EndGame-retryGame"
        />
      </div>
    )
  }
  

  render() {
    if (this.state.gameState === GameState.game) {
      return (
        <CardsControl
          engine={this.engine}
          settingsTimeout={this.settingsTimeout}
        /> 
      )
    } else if (this.state.gameState === GameState.finished) {
        return (
          this.renderFinish()
        )
    }
      else {
        return (
          this.renderStart()
        )
    }
  }


}

App.defaultProps = {
  btnText: 'Старт',
  winScore: 0 //null
};

export default App;