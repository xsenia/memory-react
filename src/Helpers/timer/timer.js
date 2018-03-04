class Timer {

  constructor(finishCallback, timeout){
    this.finishCallback = finishCallback;
    this.timeout = timeout || 5000;
  }
  
  start() {
    this.clear();
    const sec = this.timeout;
    this.timer = setTimeout(() => {this.finishCallback();}, sec);
  }

  clear(){
    clearTimeout(this.timer);
  }

  

}


export default Timer;