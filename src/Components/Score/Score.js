import React from 'react';



const Score = (props) => {
  //console.log('---',props);
    
    return(
      <div>       
        Ваши очки: {props.score}
      </div>
    );
}



export default Score;

