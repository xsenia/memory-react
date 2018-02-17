import React, { Component } from 'react';
import Table from '../Table/Table';

class ButtonStart extends Component {
  constructor(props, state) {
      super(props, state);
      this.state = {gameBegun: false};
  }


  startGame(event) {
    event.preventDefault();
    this.setState({ gameBegun: !this.state.gameBegun });
  }
  
  
  render(){
    
    return this.state.gameBegun 
      ? <Table />
      : (
        <button
          id="newGameButton" 
          data-tid={this.props.tid}
          className="buttonStart"
          onClick={(еvent) => this.startGame(еvent)}>
          {this.props.name}
        </button>
      );
  }

}

export default ButtonStart;

