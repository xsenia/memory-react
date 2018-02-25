import React, { Component } from 'react';

import StartAgain from '../StartAgain/StartAgain';
import CardsControl from '../CardsControl/CardsControl';

class Table extends Component {
  
  
  
  render(){

    
    return(
      <div className="table">
        <StartAgain /> 
        <p>Стол с картами к вашим услугам</p>
        <CardsControl />       
        

      </div>
    );
  }

}

export default Table;

