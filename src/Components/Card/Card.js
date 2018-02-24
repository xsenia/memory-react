import React from 'react';
import './Card.css';
import backCard from '../../Resources/Images/Cards/back.png';


const Card = (props) => {
  //console.log('---',props);
  /*const {id, name, opened, guessed} = props;*/
  const cardName = props.cardName;
  const prefix = 'card';
  const cardClassName = `${prefix} ${prefix}--${cardName}`;
  const id = `${props.id}`;
  return(
    <div 
      id={id} 
      className={cardClassName}
      data-open={props.opened}
      data-guessed={props.guessed}
      onClick={() => props.clickHandle(id)}
    >
      <img src={backCard} className="backCard" alt="backCard" />
    </div>
  );
}

export default Card;
/*цепочка же начинается с Карда, когда кликаем по диву - цепочка передачи ид стартует оттуда
onMouseEnter
*/



