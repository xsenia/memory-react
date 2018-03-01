class Timer {

  constructor(finishCallback, timeout){
    this.finishCallback = finishCallback;
    this.timeout = timeout || 5000;
    console.log('this.finishCallback -- ',this.finishCallback);
  }

  //this.finishCallback - перевернуть все открытые карты, т.е. убрать open

  start() {    
    this.finishCallback();
  }

  clear(){
    clearTimeout(this.finishCallback);
  }

  

}


export default Timer;