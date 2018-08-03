import React, { Component } from "react";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 205,
      timeLeft: 1500,
      timerLabel: "session",
      oneMinLeft: true,
      countdownSession: true,
      pause: true
    };
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.reset = this.reset.bind(this);
    this.playPause = this.playPause.bind(this);
    this.countdown = this.countdown.bind(this);
    this.millisToMinSec = this.millisToMinSec.bind(this);
    this.splitToMS = this.splitToMS.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.clockify = this.clockify.bind(this);

    // let timer = "";
  }

  startTimer() {
    this.timer = setInterval(this.countdown, 1000);
  }

  pauseTimer() {
    clearInterval(this.timer);
  }

  playAudio() {
    const audio = document.getElementById("beep");
    audio.play();
    console.log("play sound");
    // const breakSound = new Audio(
    //   "http://www.orangefreesounds.com/wp-content/uploads/2018/03/Meditation-bell-sound.mp3?_=1"
    // );
    // const sessionSound = new Audio(
    //   "http://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/Hip%20Hop%20Specialty%20Kit/296[kb]say-bow-beep.wav.mp3"
    // );
    // this.state.countdownSession ? breakSound.play() : sessionSound.play();
  }

  playPause() {
    this.state.pause ? this.startTimer() : this.pauseTimer();

    this.setState({ pause: !this.state.pause });
  }

  countdown() {
    const breakTime = this.state.breakLength * 60;
    const sessionTime = this.state.sessionLength * 60;
    console.log(this.clockify());

    if (this.state.timeLeft == 0) {
      document.getElementById("beep").play();
      if (this.state.countdownSession) {
        //this.playAudio();
        this.setState({
          countdownSession: !this.state.countdownSession,
          timeLeft: breakTime,
          timerLabel: "break"
        });
      } else {
        //this.playAudio();
        this.setState({
          countdownSession: !this.state.countdownSession,
          timeLeft: sessionTime,
          timerLabel: "session"
        });
      }
    } else {
      const setTime = this.state.timeLeft;
      // const convertToMS = parseInt(setTime * 60000);
      this.setState({ timeLeft: setTime - 1 });
    }
  }

  millisToMinSec(millis) {
    const mins = Math.floor(millis / 60);
    const sec = (millis % 60).toFixed(0);
    return (mins < 10 ? "0" : "") + mins + ":" + (sec < 10 ? "0" : "") + sec;
  }

  splitToMS(time) {
    const timeSplit = time.split(":");
    return parseInt(timeSplit[0]) * 60000 + parseInt(timeSplit[1]) * 1000;
  }

  reset() {
    clearInterval(this.timer);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    // audio.pause();

    // audio.currentTime = 0;
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 1500,
      timerLabel: "session"
    });
  }
  incrementBreak() {
    const curValUp = this.state.breakLength + 1;

    curValUp <= 60 && this.setState({ breakLength: curValUp });
  }

  decrementBreak() {
    const curValUp = this.state.breakLength - 1;
    curValUp > 0 && this.setState({ breakLength: curValUp });
  }

  incrementSession() {
    const curValUp = this.state.sessionLength + 1;
    const timeLeft = curValUp * 60;
    curValUp <= 60 &&
      this.setState({
        sessionLength: curValUp,
        timeLeft: timeLeft
      });
  }

  clockify(secs) {
    let minutes = Math.floor(secs / 60);
    let seconds = secs - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  }

  decrementSession() {
    const curValUp = this.state.sessionLength - 1;
    const timeLeft = curValUp * 60;
    curValUp > 0 &&
      this.setState({
        sessionLength: curValUp,
        timeLeft: timeLeft
      });
  }

  render() {
    return (
      <div className="App">
        <div id="clockWrapper">
          <Break
            breakLength={this.state.breakLength}
            incrementBreak={this.incrementBreak}
            decrementBreak={this.decrementBreak}
          />
          <Session
            sessionLength={this.state.sessionLength}
            incrementSession={this.incrementSession}
            decrementSession={this.decrementSession}
          />
          <Timer
            timerLabel={this.state.timerLabel}
            timeLeft={this.state.timeLeft}
            reset={this.reset}
            playPause={this.playPause}
            millisToMinSec={this.millisToMinSec}
            clockify={this.clockify}
          />
        </div>
      </div>
    );
  }
}

export default App;

class Break extends Component {
  render() {
    return (
      <div id="breakBox">
        <div id="break-label">
          Break Length
          <div id="break-length">{this.props.breakLength}</div>
        </div>
        <div
          id="break-decrement"
          className="decrement"
          onClick={this.props.decrementBreak}
        />
        <div
          id="break-increment"
          className="increment"
          onClick={this.props.incrementBreak}
        />
      </div>
    );
  }
}

class Session extends Component {
  render() {
    return (
      <div id="sessionBox">
        <div id="session-label">
          Session Length
          <div id="session-length">{this.props.sessionLength}</div>
        </div>
        <div
          id="session-decrement"
          className="decrement"
          onClick={this.props.decrementSession}
        />
        <div
          id="session-increment"
          className="increment"
          onClick={this.props.incrementSession}
        />
      </div>
    );
  }
}

class Timer extends Component {
  render() {
    return (
      <div id="timerBox">
        <div id="timer-label">{this.props.timerLabel}</div>
        <div id="time-left">
          {this.props.clockify(this.props.timeLeft)}
          {/* {this.props.millisToMinSec(this.props.timeLeft)} */}
        </div>
        <div id="start_stop" onClick={this.props.playPause}>
          ⏯
        </div>
        <div id="reset" onClick={this.props.reset}>
          reset
        </div>
        <audio
          // src="http://www.orangefreesounds.com/wp-content/uploads/2018/03/Meditation-bell-sound.mp3?_=1"
          src="https://goo.gl/65cBl1"
          id="beep"
          preload="auto"
        />
      </div>
    );
  }
}
