import React, { Component } from "react";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 1500,
      timerLabel: "session",
      oneMinLeft: true,
      countdownSession: true,
      pause: true,
      interval: null
    };

    this.playPause = this.playPause.bind(this);

    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.reset = this.reset.bind(this);
  }

  playPause() {
    let interval = null;
    if (this.state.interval) {
      interval = clearInterval(this.state.interval);
    } else {
      interval = setInterval(() => {
        if (this.state.timeLeft > 0) {
          this.setState({ timeLeft: this.state.timeLeft - 1, pause: false });
        } else {
          document.getElementById("beep").play();
          this.state.countdownSession
            ? this.setState({
                timeLeft: this.state.breakLength * 60,
                countdownSession: !this.state.countdownSession,
                timerLabel: "break",
                pause: false
              })
            : this.setState({
                timeLeft: this.state.sessionLength * 60,
                countdownSession: !this.state.countdownSession,
                timerLabel: "session",
                pause: false
              });
        }
      }, 1000);
    }
    this.setState({ interval, pause: !this.state.pause });
  }

  reset() {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;

    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 1500,
      timerLabel: "session",
      interval: clearInterval(this.state.interval),
      countdownSession: true
    });
  }
  incrementBreak() {
    const curValUp = this.state.breakLength + 1;

    curValUp <= 60 && this.setState({ breakLength: curValUp });
  }

  decrementBreak() {
    const curValDown = this.state.breakLength - 1;
    curValDown > 0 && this.setState({ breakLength: curValDown });
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

  decrementSession() {
    const curValDown = this.state.sessionLength - 1;
    const timeLeft = curValDown * 60;
    curValDown > 0 &&
      this.setState({
        sessionLength: curValDown,
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
    let minutes = Math.floor(this.props.timeLeft / 60);
    let seconds = this.props.timeLeft - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const timeAvail = minutes + ":" + seconds;

    return (
      <div id="timerBox">
        <div id="timer-label">{this.props.timerLabel}</div>
        <div id="time-left">{timeAvail}</div>
        <div id="start_stop" onClick={this.props.playPause}>
          ⏯
        </div>
        <div id="reset" onClick={this.props.reset}>
          reset
        </div>
        <audio src="https://goo.gl/65cBl1" id="beep" preload="auto" />
      </div>
    );
  }
}

export default App;
