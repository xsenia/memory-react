class Engine {

  constructor(arg1) {
    this.arg1 = arg1;
    this._inner = false;
    this.guessedPair = 0;
  }

  getHello = () => {
    console.log(this.arg1);
    console.log(this.getInner());
  }

  getInner() {
    return "Привет";
  }

  /*scoreWin = () => {
    const score = this.score;
    let guessedPair = this.guessedPair;
    const noGuessedPair = this.gameCards.length/2 - guessedPair;
    const scoreWin = score + (noGuessedPair)*42;
    guessedPair = guessedPair + 1;    
    const resultWin = [scoreWin, guessedPair];
    return resultWin;
  }

  scoreLost = () => {
    const score = this.score;
    let guessedPair = this.guessedPair;
    const scoreLost = score - guessedPair*42;
    const resultLost = [scoreLost, guessedPair];
    return resultLost;
  }*/
  
  

}


export default Engine;