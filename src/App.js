import React, { Component } from "react";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 1,
      sessionLength: 1,
      timeLeft: 100,
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
      }, 100);
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
      countdownSession: true,
      pause: true
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

  componentDidMount = () => {
    let resetBtn = document.getElementById("reset");
    resetBtn.addEventListener(
      "click",
      () => {
        resetBtn.classList.remove("run-animation");
        void resetBtn.offsetWidth;
        resetBtn.classList.add("run-animation");
      },
      false
    );
  };

  componentWillUpdate = () => {
    let background = document.getElementById("clockWrapper");
    if (this.state.timerLabel == "session") {
      background.classList.add("sessionBackground");
      background.classList.remove("breakBackground");
    } else {
      background.classList.add("breakBackground");
      background.classList.remove("sessionBackground");
    }
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div id="clockWrapper" className="clockBackground">
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
            pause={this.state.pause}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

const Header = () => {
  return <h1 id="header"> FCC | Pomodoro Clock</h1>;
};

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
        >
          <i className="fas fa-chevron-circle-down" />
        </div>
        <div
          id="break-increment"
          className="increment"
          onClick={this.props.incrementBreak}
        >
          <i className="fas fa-chevron-circle-up" />
        </div>
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
        >
          <i className="fas fa-chevron-circle-down" />
        </div>
        <div
          id="session-increment"
          className="increment"
          onClick={this.props.incrementSession}
        >
          <i className="fas fa-chevron-circle-up" />
        </div>
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
        <div id="timer-label">
          {this.props.timerLabel}
          {this.props.timeLeft < 60 ? (
            <div id="time-left" style={{ color: "#ff8360" }}>
              {timeAvail}
            </div>
          ) : (
            <div id="time-left">{timeAvail}</div>
          )}
        </div>

        <div id="start_stop" onClick={this.props.playPause}>
          {this.props.pause ? (
            <i className="fas fa-play-circle" />
          ) : (
            <i className="fas fa-pause-circle" />
          )}
        </div>
        <div id="reset" onClick={this.props.reset}>
          <i className="fas fa-redo-alt" />
        </div>
        <audio src="https://goo.gl/65cBl1" id="beep" preload="auto" />
      </div>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="socialLinks">
          <a href="https://github.com/REAOrlando" target="_blank">
            <i className="fab fa-github" />
          </a>

          <a
            href="https://www.linkedin.com/in/christopheralbanesefl/"
            target="_blank"
          >
            <i className="fab fa-linkedin" />
          </a>

          <a href="https://twitter.com/albanesechris" target="_blank">
            <i className="fab fa-twitter" />
          </a>

          <a href="https://codepen.io/REAOrlando/" target="_blank">
            <i className="fab fa-codepen" />
          </a>
        </div>

        <p> Created by Christopher Albanese</p>
      </div>
    );
  }
}

export default App;
