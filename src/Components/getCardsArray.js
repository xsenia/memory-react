const getCardsArray = (cardsArray) => {
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



export default getCardsArray;