import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import Card from '../Card/Card';

class CardsControl extends Component {

  constructor(props,state) {
    super(props);
    const gameCards = this.getCardsArray(this.cardDeck);
    this.state = {      
      gameCards: gameCards,
      firstOpenedCardName: null,
      firstOpenedCardId: null,
      test: true
    };
  }

  componentDidMount() {
    this.timerTurnCard();
  }

  timerTurnCard = () => {
    setTimeout(() => {      
      const gameCardsClose = () => {
        const cloneGameCards = this.state.gameCards.slice(0);
        console.log(cloneGameCards);
        const gameCardsClosed = cloneGameCards.map((card, i) => {
          /*const oneCard = {
              id: i, 
              name: card.name,
              opened: false,
              guessed: false
          };
          return oneCard;*/
          card.opened = false;
          return card;
        });
        return gameCardsClosed;
      };
      const gameCardsClosed = gameCardsClose();
      console.log(gameCardsClosed);
      this.setState({gameCards: gameCardsClosed});
    }, 2000); 
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
          opened: true,
          guessed: false
      };
      return oneCard;
    });
    //console.log(gameCards);
    //массив с играющими картами:      
    return gameCards;
  } //return gameCards;
  

  turnCard = (cardId) => { 

    let cloneGameCards = this.state.gameCards.slice(0);//создаем клон массива карт игры, после первого раза берем измененный массив из стейта
    cloneGameCards[cardId].opened = true;//в массиве у кликнутой карты  меняем состояние открыто на true
    
    let firstCardId = cloneGameCards[cardId].id; //сохранили имя кликнутой карты в firstCardName
    let firstCardName = cloneGameCards[cardId].name; //сохранили имя кликнутой карты в firstCardName
        
    
    //в первом проходе пропускаем
    if ( this.state.firstOpenedCardName !== null) {
      if (this.state.firstOpenedCardName === cloneGameCards[cardId].name) {
        cloneGameCards[cardId].guessed = true;
        cloneGameCards[this.state.firstOpenedCardId].guessed = true;
        //console.log(cloneGameCards[cardId]);
      } else {
        //cloneGameCards[cardId].opened = false;
        //console.log(cloneGameCards[cardId]);
      }
    }

    this.setState({
      gameCards: cloneGameCards,//заменяем рандомный массив полученным массивом из тех же карт, но с одной открытой картой 
      firstOpenedCardName: firstCardName,//пересохраняем имя кликнутой карты 
      firstOpenedCardId: firstCardId//сохраняем id кликнутой карты 
    }, () => console.log(this.state));
    

  };

  
  
  
  render(){

    return(
      <div className="cardsWrap">        
        {this.state.gameCards.map((card, i) => 
            <Card 
              key={card.id} 
              id={card.id} 
              cardUrl={card.name} 
              opened={card.opened}
              clickHandle={(cardId) => this.turnCard(cardId)}
              guessed={card.guessed} 
            />            
        )}        
      </div>

    );
  }

}

export default CardsControl;

