class Timer {

  constructor(finishCallback, timeout){
    this.finishCallback = finishCallback;
    this.timeout = timeout || 5000;
  }

  //this.finishCallback - перевернуть все открытые карты, т.е. убрать open

  start() { 
    setTimeout(this.finishCallback, this.timeout);
  }

  clear(){
    clearTimeout(this.finishCallback);
  }

  

}


export default Timer;