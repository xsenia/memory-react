import React from 'react';



const Button = (props) => {
  
    return(
      <div>       
        <button
          className="buttonStart"
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
