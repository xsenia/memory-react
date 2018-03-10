class Engine {

  constructor(gameFinished, settings) {
    this.gameFinished = gameFinished;
    this.amount = settings.amount;
    this.timeOut = settings.timeOut;
    this.guessedCardsAmount = 0;
    this.score = 0;
    this.winScore = 0;
  }

  _updateGuessedCardsAmount(){
    this.guessedCardsAmount += 1;
  }
 
  _getFinish() {
    if (this.amount === this.guessedCardsAmount) {
        this.winScore = this.score;        
        setTimeout(() => {
          this.score = 0;
          this.guessedCardsAmount = 0;
          this.gameFinished();
        }, 500)
      }
  }

  updateScore(noGuessed){ 
    if(noGuessed){
      this.score -= this.guessedCardsAmount * 42;
    }
    else{
      this.score += (this.amount - this.guessedCardsAmount) * 42;
      this._updateGuessedCardsAmount();
      this._getFinish();      
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

  getAmount(){    
    return this.amount;
  }

  getTimeout(){    
    return this.timeOut;
  }

}


export default Engine;