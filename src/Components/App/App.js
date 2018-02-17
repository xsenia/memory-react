import React, { Component } from 'react'; 
import ButtonStart from '../ButtonStart/ButtonStart';
import logo from '../../Resources/Images/StartGame.png';

class App extends Component { 
  render() { 
    return (
      (        
        <div id="wrap" className="wrap" data-tid="App">    
          <div id="deck" className="deck" data-tid="Deck">
            <div id="intro" className="intro">
              <img src={logo} className="App-logo" alt="Начать игру Start" />
              <h1>Мемори</h1>
              <ButtonStart tid="NewGame-startGame" name="Начать игру" />
            </div>
            <div id="cardsWrap" className="hidden-block"></div>
          </div>
        </div>
      )
    );
  }
}

export default App;
