import React, { Component } from 'react';
import CardsControl from '../CardsControl/CardsControl';

class Table extends Component {
  
  
  
  render(){

    
    return(
      <div className="table">
        <p>Стол с картами к вашим услугам</p>
        <CardsControl />
      </div>
    );
  }

}

export default Table;

