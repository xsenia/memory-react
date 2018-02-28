class Engine {

  constructor(arg1, cardsAmount) {
    this.arg1 = arg1;
    this.cardsAmount = cardsAmount;
    this.guessedCardsAmount = 0;
    this.score = 0;
  }

  //arg1; зачем?

  //tmp
  getHello = () => {
    //console.log(this.arg1);
  }

  updateGuessedCardsAmount(){
    //дергаешь, когда угадали очередную пару
    this.guessedCardsAmount += 1;
  }

  //вызываешь с true, когда НЕ угадали, и без аргументов, когда угадали
  updateScore(decrement?: boolean){
    //здесь надо проверять, отгадали ли все карты, или еще не все
    
    if(decrement){
      this.score -= this.guessedCardsAmount * 42;
    }
    else{
      this.updateGuessedCardsAmount();
      this.score += (this.cardsAmount - this.guessedCardsAmount) * 42;
    }

  }

  getScore() {
    console.log(this.score);
    return this.score;
  }

  getGuessed(){
    return this.guessedCardsAmount;
  }

  getTest(){
    console.log('test');
  }

 
  
  

}


export default Engine;