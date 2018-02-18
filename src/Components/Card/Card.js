import React, { Component } from 'react';
import './Card.css';
import backCard from '../../Resources/Images/Cards/back.png';


class Card extends Component {

  constructor(props) {
      super(props);
  }

  render(){
    const cardName = this.props.cardName;
    const prefix = 'card';
    const cardClassName = `${prefix} ${prefix}--${cardName}`;
    return(
      <div className={cardClassName}>
        <img src={backCard} className="backCard" alt="backCard" />
      </div>
    );


    //вывод изображений
    /*const path = '../../Resources/Images/Cards/';
    const cardName = this.props.cardName;
    const imgType = '.png';
    const urls = `${path}${cardName}${imgType}`;
    console.log(path);
    console.log(cardName);
    return(
      <div className="card">
        <img
          alt={this.props.cardName} 
          src={urls}  
        />
      </div>
    );*/

  }
}

export default Card;



