import React, { Component } from 'react';
/*import cardImg from '../../Resources/Images/Cards/JH.png';*/
import Card from '../Card/Card';


class CardsControl extends Component {

  state = {
    turn: false
  };

  turnCard = (cardId) => {
    
    this.setState({ turn: !this.state.turn }, () => console.log(this.state));
   
  };
  
  render(){

    
    /*--------------------------работа с массивом-----------------------------*/
    const cardsArray =  ['0C','0D','0H','0S','2C','2D','2H','2S','3C','3D','3H','3S','4C','4D','4H','4S','5C','5D','5H','5S','6C','6D','6H','6S','7C','7D','7H','7S','8C','8D','8H','8S','9C','9D','9H','9S','AC','AD','AH','AS','JC','JD','JH','JS','KC','KD','KH','KS','QC','QD','QH','QS'];    
    //функция перемешивания массива:
    function compareRandom(a, b) {
      return Math.random() - 0.5;
    }
    //новый перемешанный массив:
    const randomCardArr = cardsArray.sort(compareRandom); 
    //укороченный до 9 массив:
    const randomArrShot = []; 
    for (var i = 0; i < 9; i++) {
      randomArrShot.push(randomCardArr[i]);
    }
    //удвоенный массив:
    const randomArrDuble = randomArrShot.concat(randomArrShot); 
    //перемешанный удвоенный массив:
    const randomArrDubleRandom = randomArrDuble.sort(compareRandom);
    //массив с играющими картами:
    let gameCards = randomArrDubleRandom.map((card, i) => {
        const oneCard = {
            id: i, 
            name: card,
            isOpened: this.state.turn ? 'true' : 'false'
        };
        return oneCard;
    });
    //console.log(gameCards);
    /*------------------------//работа с массивом-----------------------------*/

    

    /*тут теперь массив с играющими картами*/
    return(
      <div className="cardsWrap">        
        {gameCards.map((card, i) => 
            <Card 
              key={card.id} 
              id={card.id} 
              cardUrl={card.name} 
              turn={card.isOpened}
              onClick={(cardId) => this.turnCard(cardId)} 
            />            
        )}        
      </div>

    );
  }

}

export default CardsControl;





/*-----переворот карт---*/
    /*const timeout = function () {
      const cards =  document.getElementsByClassName('card');
      if (cards.length > 0) {
        for (var i = 0; i < cards.length; i++) {
          cards[i].classList.add("turnaround");
        }
      }  
    }
    setTimeout(timeout, 2000);*/
    /*---//переворот карт---*/
    

    //в переменную  stateTurn положила состояние
    /*let stateTurn = this.state.turn;
    this.state.turn ? stateTurn = 'true' : stateTurn = 'false'*/
   