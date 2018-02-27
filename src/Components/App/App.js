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
      gameBegun: false,
      gameWin: false 
    };
    
    let arg001 = this.state.gameWin;
    this.engine = new Engine(arg001);
  }

  
  

  startGame = event => {
    event.preventDefault();
    this.setState({ gameBegun: !this.state.gameBegun }/*, () => console.log(this.state)*/);
  };

  render() {

    this.engine.getHello(); 
   
    
    


    const winScore= this.props.winScore;
    const winScoreStr = winScore ? `Ваши очки ${winScore}` : null;

    return this.state.gameBegun 
      ? 
            <CardsControl
              engine={this.engine}
            />
          
      : (
        
            <div id="intro" className="intro">
                <img src={logo} className="App-logo" alt="Начать игру Start" />
                <h1>Мемори</h1>
                
                <p>{winScoreStr}</p>            
                
                <Button
                  btnText = 'Старт'
                  onClick={(еvent) => this.startGame(еvent)}
                />
                
                

              </div>
            
      );



  }
}

App.defaultProps = {
  btnText: 'Старт',
  winScore: 0 //null
};

export default App;