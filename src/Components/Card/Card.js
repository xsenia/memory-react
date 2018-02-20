import React, { Component } from 'react';
import './Card.css';
import backCard from '../../Resources/Images/Cards/back.png';


const Card = (props) => {
  const cardName = props.cardUrl;
  const prefix = 'card';
  const cardClassName = `${prefix} ${prefix}--${cardName}`;
  const id = `${props.id}`;
  return(
    <div id={id} className={cardClassName}>
      <img src={backCard} className="backCard" alt="backCard" />
    </div>
  );
}

export default Card;



