import React, { Component } from 'react'; 

class ButtonStart extends Component {
  constructor(props) {
      super(props);
      this.state = {clicked: true};
  }


  handleButt(event) {
    event.preventDefault();
    this.setState({ clicked: !this.state.clicked });
  }
  
  
  render(){
    
    let message;

    if (this.state.clicked) {
      message = 'кликнули';
    } else {
      message = 'не кликнули';
    }

    console.log(this.state.clicked);

    return(
      <div>
        <button
          id="newGameButton" 
          data-tid={this.props.tid}
          className="buttonStart"
          onClick={(еvent) => this.handleButt(еvent)}>
          {this.props.name}
        </button>
        <p>Сообщение: {message}</p>        
      </div>
    );
  }

}//END class ButtonStart extends Component

export default ButtonStart;

