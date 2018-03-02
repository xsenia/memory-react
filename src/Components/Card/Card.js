import React from 'react';
import './Card.css';
import backCard from '../../Resources/Images/Cards/back.png';


const Card = (props) => {
  //console.log('---',props);
  //const {id, name, opened, guessed, clickHandle} = props;
  const cardName = props.name;
  const prefix = 'card';
  const cardClassName = `${prefix} ${prefix}--${cardName}`;
  const id = `${props.id}`;
  return(
    <div 
      id={id} 
      className={cardClassName}
      data-open={props.opened}
      data-guessed={props.guessed}
      data-desabled={props.disabled}
      onClick={() => props.clickHandle(id)}
    >
      <img src={backCard} className="backCard" alt="backCard"  />
    </div>
  );
}

export default Card;



