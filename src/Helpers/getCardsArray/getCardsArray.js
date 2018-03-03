import cardDeck from './cardDeck';

const getCardsArray = (cardsAmount) => {
  if(!cardDeck || !cardDeck.length) {
    return null;
  } else {
    function randomizeArray(arr){
      return arr.sort(() => Math.random() - 0.5); 
    }
    const randomCardArr = randomizeArray(cardDeck);  
    const randomArrShot = randomCardArr.slice(0,cardsAmount);
    const randomArrDuble = randomArrShot.concat(randomArrShot);
    const randomArrDubleRandom = randomizeArray(randomArrDuble);
    const gameCards = randomArrDubleRandom.map((card, i) => {
      const oneCard = {
          id: i, 
          name: card,
          opened: true,
          guessed: false
      };
      return oneCard;
    });     
    return gameCards;
  }

}


export default getCardsArray;