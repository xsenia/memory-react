import cardDeck from './cardDeck';

const getCardsArray = (cardsAmount) => {
  if(!cardDeck || !cardDeck.length) {
    return null;
  } else {
    //функция перемешивания массива:
    function randomizeArray(arr){
      return arr.sort(() => Math.random() - 0.5); 
    }
    //новый перемешанный массив:
    const randomCardArr = randomizeArray(cardDeck);
    //укороченный до 9 массив:
    //const randomArrShot = randomCardArr.slice(0,9);    
    const randomArrShot = randomCardArr.slice(0,cardsAmount);    
    //удвоенный массив:
    const randomArrDuble = randomArrShot.concat(randomArrShot);
    //перемешанный удвоенный массив:
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
    //массив с играющими картами:      
    return gameCards;
  } //return gameCards;

}




export default getCardsArray;