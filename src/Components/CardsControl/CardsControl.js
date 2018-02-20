import React, { Component } from 'react';
/*import cardImg from '../../Resources/Images/Cards/JH.png';*/
import Card from '../Card/Card';


class CardsControl extends Component {

  
  render(){

    /*-----переворот карт---*/
    function func() {
      alert( 'Привет' );
    }
    setTimeout(func, 1000);
    /*---//переворот карт---*/



    /*--------------------------работа с массивом-----------------------------*/
    const cardsArray =  ['0C','0D','0H','0S',
                         '2C','2D','2H','2S',
                         '3C','3D','3H','3S',
                         '4C','4D','4H','4S',
                         '5C','5D','5H','5S',
                         '6C','6D','6H','6S',
                         '7C','7D','7H','7S',
                         '8C','8D','8H','8S',
                         '9C','9D','9H','9S',
                         'AC','AD','AH','AS',
                         'JC','JD','JH','JS',
                         'KC','KD','KH','KS',
                         'QC','QD','QH','QS'];
    
    /*функция перемешивания массива*/
    function compareRandom(a, b) {
      return Math.random() - 0.5;
    }
    const randomCardArr = cardsArray.sort(compareRandom); //новый перемешанный массив
    const randomArrShot = []; //укороченный до 9 массив
    for (var i = 0; i < 9; i++) {
      randomArrShot.push(randomCardArr[i]);
    }
    const randomArrDuble = randomArrShot.concat(randomArrShot); //удвоенный массив
    const randomArrDubleRandom = randomArrDuble.sort(compareRandom); //перемешанный удвоенный массив
    /*------------------------//работа с массивом-----------------------------*/
    
    


    /*----------------------массив с играющими картами------------------------*/
    let gameCards = randomArrDubleRandom.map((card, i) => {
        const oneCard = {
            id: i, 
            name: card
        };
        return oneCard;
    });
    console.log(gameCards);
    /*--------------------//массив с играющими картами------------------------*/
    
   

    /*тут теперь массив с играющими картами*/
    return(
      <div className="cardsWrap">
        {gameCards.map((card, i) => 
            <Card key={i} id={card.id} cardUrl={card.name} />
        )}
      </div>
    );





  }

}

export default CardsControl;

