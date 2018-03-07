import React from 'react';
import './Card.css';



const Card = (props) => {
  const cardName = props.name;
  const prefix = 'card';
  const cardClassName = `${prefix} ${prefix}--${cardName}`;
  const idCard = `${props.id}`;
  return(
    <div 
      id={idCard} 
      className={cardClassName}
      data-desabled={props.disabled}
      data-open={props.opened}
      data-guessed={props.guessed}
      data-tid={props.opened ? 'Card' : 'Card-flipped'}
      onClick={() => props.clickHandle(idCard)}
    >      
      <div className="cardsBack"></div>
    </div>
  );
}

export default Card;



