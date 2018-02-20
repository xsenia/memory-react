import React, { Component } from 'react';
import Table from '../Table/Table';
import logo from '../../Resources/Images/StartGame.png';

class ButtonStart extends Component {
  
  /*первый вариант*/
  /*constructor(props, state) {
      super(props, state);
      this.state = {gameBegun: false};
  }

  startGame(event) {
    event.preventDefault();
    this.setState({ gameBegun: !this.state.gameBegun });
  }*/
  /*1*/

  /*второй вариант*/
  state = {
    gameBegun: false
  };

  startGame = event => {
    event.preventDefault();
    this.setState({ gameBegun: !this.state.gameBegun }, () => console.log(this.state));
  };
  /*2*/
  
  render(){
    
    return this.state.gameBegun 
      ? <Table />
      : (
        <div id="intro" className="intro">
            <img src={logo} className="App-logo" alt="Начать игру Start" />
            <h1>Мемори</h1>            
            <button
              className="buttonStart"
              onClick={(еvent) => this.startGame(еvent)}>
              Начать игру
            </button>
          </div>
      );
  }

}

export default ButtonStart;

