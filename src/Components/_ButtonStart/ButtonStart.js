import React, { Component } from 'react';
/*import Table from '../Table/Table';*/
import CardsControl from '../CardsControl/CardsControl';
import logo from '../../Resources/Images/StartGame.png';

class ButtonStart extends Component {

  constructor(props,state) {
    super(props);    
    this.state = {
      gameBegun: false
    };
    //console.log(this.props.winScore);
  }

  startGame = event => {
    event.preventDefault();
    this.setState({ gameBegun: !this.state.gameBegun }/*, () => console.log(this.state)*/);
  };
   
  render(){    
    
    const winScore= this.props.winScore;
    const winScoreStr = winScore ? `Ваши очки ${winScore}` : null;

    return this.state.gameBegun 
      ? <CardsControl />
      : (
        <div id="intro" className="intro">
            <img src={logo} className="App-logo" alt="Начать игру Start" />
            <h1>Мемори</h1>
            
            <p>{winScoreStr}</p>            
            
            <button
              className="buttonStart"
              onClick={(еvent) => this.startGame(еvent)}>
              {this.props.btnText}
            </button>
          </div>
      );
  }

}

ButtonStart.defaultProps = {
  btnText: 'Старт',
  winScore: null
};

export default ButtonStart;

