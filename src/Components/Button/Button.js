import React from 'react';



const Button = (props) => {
    
    const classButton = `buttonStart ${props.disabled ? 'desabled' : ''}`;
    return(
      <div>       
        <button
          disabled={props.disabled}
          className={classButton}
          onClick={props.onClick}
          data-tid={props.dataTid}>
          {props.btnText}
        </button>
      </div>
    );
}

Button.defaultProps = {
  btnText: 'Старт',
  winScore: null
};

export default Button;
