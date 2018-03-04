import React from 'react';
import './Card.css';
import backCard from '../../Resources/Images/Cards/back.png';


const Card = (props) => {
  //const {id, name, opened, guessed, clickHandle, dataTid} = props;
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
      data-tid={props.dataTid}
      onClick={() => props.clickHandle(idCard)}
    >
      <img src={backCard} className="backCard" alt="backCard"  />
    </div>
  );
}

export default Card;



