import React, { Component } from 'react'; 

class ButtonStart extends Component {
  ololoText = '';
  
  componentWillMount(){
    this.ololoText = 'ololo';
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

