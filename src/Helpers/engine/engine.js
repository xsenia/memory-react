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
    this.guessedCardsAmount += 1;
  }

 
  updateScore(noGuessed){ 
    if(noGuessed){
      this.score -= this.guessedCardsAmount * 42;
    }
    else{
     
      
      this.score += (this.amount - this.guessedCardsAmount) * 42;
      this._updateGuessedCardsAmount();


      if (this.amount === this.guessedCardsAmount) {
         
        this.winScore = this.score;
        
        setTimeout(() => {
          this.score = 0;
          this.guessedCardsAmount = 0;
          this.gameFinished();
        }, 500)
      }
    }
  }

  setToZero() {
    this.score = 0;
    this.guessedCardsAmount = 0;
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

  getAmount(){
     return this.amount;
  }

}


export default Engine;