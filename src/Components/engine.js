class Engine {

  constructor(gameFinished, settings) {
    this.amount = settings.amount; //9
    this.timeOut = settings.timeOut;
    this.gameFinished = gameFinished;
    this.guessedCardsAmount = 0;
    this.score = 0;
    this.winScore = 0;
  }


  _updateGuessedCardsAmount(){
    //дергаешь, когда угадали очередную пару
    this.guessedCardsAmount += 1;
  }

  //вызываешь с true, когда НЕ угадали, и без аргументов, когда угадали
  updateScore(noGuessed){ 
    if(noGuessed){
      this.score -= this.guessedCardsAmount * 42;
    }
    else{
      this._updateGuessedCardsAmount();
      this.score += (this.amount - this.guessedCardsAmount) * 42;
      
      if (this.amount === this.guessedCardsAmount) {
        this.gameFinished();
        this.winScore = this.score;
        this.score = 0;
        this.guessedCardsAmount = 0;
      }
    }
  }

  getAgain(){    
    if (this.amount === this.guessedCardsAmount) {
      return true;
    }
  }

  getWinScore() {    
    return this.winScore;
  }

  getScore() {    
    return this.score;
  }

  getGuessed(){
    return this.guessedCardsAmount;
  }

  getGameState(){
     return this.gameState;
  }

}


export default Engine;