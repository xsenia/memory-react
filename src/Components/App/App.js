import React, { Component } from 'react'; 
import ButtonStart from '../ButtonStart/ButtonStart';


class App extends Component { 
  render() { 
    return (
      (        
        <div id="wrap" className="wrap" data-tid="App">    
          <div id="deck" className="deck" data-tid="Deck">
            <ButtonStart />            
          </div>
        </div>
      )
    );
  }
}

export default App;
