import React, { Component } from 'react';
import Card from '../Card/Card';

class CardsControl extends Component {
  

  constructor(props) {
    super(props);
    const gameCards = this.getCardsArray(this.cardDeck);

    this.state = {
      firstOpenedCard: null,
      gameCards: gameCards
    };

  }

  cardDeck =  ['0C','0D','0H','0S','2C','2D','2H','2S','3C','3D','3H','3S','4C','4D','4H','4S','5C','5D','5H','5S','6C','6D','6H','6S','7C','7D','7H','7S','8C','8D','8H','8S','9C','9D','9H','9S','AC','AD','AH','AS','JC','JD','JH','JS','KC','KD','KH','KS','QC','QD','QH','QS'];

  getCardsArray = (cardsArray) => {
    //функция перемешивания массива:
    function compareRandom(a, b) {
      return Math.random() - 0.5;
    }
    //новый перемешанный массив:
    const randomCardArr = cardsArray.sort(compareRandom); 
    //укороченный до 9 массив:
    const randomArrShot = randomCardArr.slice(0,9);    
    //удвоенный массив:
    const randomArrDuble = randomArrShot.concat(randomArrShot); 
    //перемешанный удвоенный массив:
    const randomArrDubleRandom = randomArrDuble.sort(compareRandom);
    let gameCards = randomArrDubleRandom.map((card, i) => {
        const oneCard = {
            id: i, 
            name: card,
            opened: false
        };

        return oneCard;
    });
    //console.log(gameCards);
    //массив с играющими картами:      
    return gameCards;
  }
  

  turnCard = (cardId) => {    
    

    let cloneGameCards = this.state.gameCards.slice(0);//создаем клон массива карт игры
    cloneGameCards[cardId].opened = true;//у карты с полученным id меняем состояние открыто на true
    
    let firstCardName = this.state.firstOpenedCard;
    firstCardName = cloneGameCards[cardId].name; //сохранили имя кликнутой карты в firstCardName, обновили состояние с null на имя первой кликнутой карты
    

    this.setState({
      cardsArray: cloneGameCards,//заменяем рандомный массив полученным массивом из тех же карт, но с одной открытой картой 
      firstOpenedCard: firstCardName//меняем состояние одной открытой карты с null на карту с пришедшим id     
    }, () => console.log(this.state.firstOpenedCard));

    
    
    if ( this.state.firstOpenedCard !== null) {
      if (this.state.firstOpenedCard == cloneGameCards[cardId].name) {
        alert('bingo!');
      }
    }
    

  };

  
  
  
  render(){

    return(
      <div className="cardsWrap">        
        {this.state.gameCards.map((card, i) => 
            <Card 
              key={card.id} 
              id={card.id} 
              cardUrl={card.name} 
              turn={card.opened}
              clickHandle={(cardId) => this.turnCard(cardId)} 
            />            
        )}        
      </div>

    );
  }

}

export default CardsControl;

