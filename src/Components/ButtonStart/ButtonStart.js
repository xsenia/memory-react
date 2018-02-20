import React, { Component } from 'react';
import Table from '../Table/Table';
import logo from '../../Resources/Images/StartGame.png';

class ButtonStart extends Component {

  state = {
    gameBegun: false
  };

  startGame = event => {
    event.preventDefault();
    this.setState({ gameBegun: !this.state.gameBegun }, () => console.log(this.state));
  };
   
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

