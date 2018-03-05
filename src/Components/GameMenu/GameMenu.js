import React from 'react';
import Score from '../Score/Score';
import Button from '../Button/Button';



const GameMenu = (props) => {
    return(
      <div className="gameMenu">
        <Score score = {props.score} />
        <Button
          btnText = 'Начать заново'
          onClick={props.onClick}
          dataTid='Menu-newGame'
        />
      </div>
    );
}



export default GameMenu;
