import React, { Component } from 'react'; 

class ButtonStart extends Component {
  constructor(props) {
      super(props);
      this.state = {value: ''};      
  }

  ololoText = '';
  
  componentWillMount(){
    this.ololoText = '12345';
  }
  
  sayOlolo(event){
    if(event.target)
      alert(this.ololoText);
  }
  
  render(){
    return(
      <button
        id="newGameButton" 
        data-tid={this.props.tid}
        className="buttonStart"
        onClick={(e) => this.sayOlolo(e)}>
        {this.props.name}
      </button>
    );
  }
}

export default ButtonStart;

