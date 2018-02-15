import React, { Component } from 'react'; 
import ButtonStart from './ButtonStart';
import logo from './StartGame.png';

class App extends Component { 
  render() { 
    return (
      (        
        <div id="wrap" class="wrap" data-tid="App">    
          <div id="deck" class="deck" data-tid="Deck">
            <div id="intro" class="intro">
              <img src={logo} className="App-logo" alt="Начать игру Start" />
              <h1>Мемори</h1>
              <ButtonStart tid="NewGame-startGame" name="Начать игру" />
              <ButtonStart tid="NewGame-startGame" name="Отменить" />
            </div>
            <div id="cardsWrap" class="hidden-block"></div>
          </div>
        </div>
      )
    );
  }
}

export default App;
