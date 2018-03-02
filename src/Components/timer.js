class Timer {

  constructor(finishCallback, timeout){
    this.finishCallback = finishCallback;
    this.timeout = timeout || 5000;
  }
  
  start() {
    this.clear();
    this.timer = setTimeout(() => {this.finishCallback()}, this.timeout);
  }

  clear(){
    clearTimeout(this.timer);
  }

  

}


export default Timer;