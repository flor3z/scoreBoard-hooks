import React from 'react';
import { TeamCard } from './TeamCard';
import { useState } from 'react';
import Modal from './Modal';

const DEFAULT_START_TIME = {
  seconds: 1500,
};

export function GameCard() {
  const [startTimer, setStartTimer] = useState(false);
  const [seconds, setSeconds] = useState(DEFAULT_START_TIME.seconds);
  const [timerId, setTimerId] = useState(0);
  const [maxScore, setMaxScore] = useState(null);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [displayName1, setDisplayName1] = useState('Home');
  const [displayName2, setDisplayName2] = useState('Guest');
  const [displayInputValue1, setDisplayInputValue1] = useState('');
  const [displayInputValue2, setDisplayInputValue2] = useState('');
  const [winner, setWinner] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  const [maxScoreInputValue, setMaxScoreInputValue] = useState('');

  const checkMaxScore = () => {
    if (maxScore === 0 && score1 === 0 && score2 === 0) {
      setWinner(false);
    } else if (score1 === maxScore || score2 === maxScore) {
      setWinner(true);
    }
  };

  const incrementScore = (number) => {
    if (number === 1) {
      setScore1(Math.min(score1 + 1, maxScore)); //-----> this works, check if prevstate is required
    } else if (number === 2) {
      setScore2(Math.min(score2 + 1, maxScore));
    }

    checkMaxScore();
  };

  const decrementScore = (number) => {
    if (number === 1) {
      setScore1((prevScore) => {
        return Math.max(0, prevScore - 1);
      });
    } else if (number === 2) {
      setScore2((prevScore) => {
        return Math.max(0, prevScore - 1);
      });
    } else {
      setScore1(score1);
      setScore2(score2);
    }
  };

  const onTeamNameSubmit = (team, e) => {
    e.preventDefault();
    if (team === 1) {
      setDisplayName1(displayInputValue1);
    } else if (team === 2) {
      setDisplayName2(displayInputValue2);
    }
    setDisplayInputValue1('');
    setDisplayInputValue2('');
  };

  /////////////   Submit Max Score /////////////////////////////////////

  const onSubmitMaxScore = (event) => {
    event.preventDefault();
    setMaxScore(Number(maxScoreInputValue));
    setMaxScoreInputValue('');
  };

  ///////////////////Timer Section///////////////////////////////////

  const onTimerToggle = () => {
    if (!startTimer) {
      let newTimerId = setInterval(() => {
        setSeconds((prevSec) => prevSec - 1);
      }, 1000);
      setStartTimer(!startTimer);
      setTimerId(newTimerId);
    } else {
      setStartTimer(!startTimer);
      clearInterval(timerId);
    }
  };

  if (score1 === maxScore || score2 === maxScore) {
    clearInterval(timerId);
  }

  if (seconds === 0) {
    clearInterval(timerId);
  }

  const convertToMinutes = (seconds) => {
    return Math.floor(seconds / 60);
  };

  const onClickReset = () => {
    setStartTimer(false);
    setSeconds(DEFAULT_START_TIME.seconds);
    clearInterval(timerId);
  };

  const secondsRemaining = seconds - convertToMinutes(seconds) * 60;
  //////////////////////////////////////////////////////////////////////

  ///////////////// Model Content /////////////////////////////
  const onGameReset = () => {
    if (winner) {
      setStartTimer(false);
      setOpenModal(true);
      setWinner(false);
      setMaxScore(null);
      setScore1(0);
      setScore2(0);
      setDisplayName1('Home');
      setDisplayName2('Guest');
      setDisplayInputValue1('');
      setDisplayInputValue2('');
      setSeconds(DEFAULT_START_TIME.seconds);
      clearInterval(timerId);
      setOpenModal(true);
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setWinner(false);
  };

  const playOrPause = startTimer === false ? 'Play' : 'Pause';

  return (
    <div>
      {winner ? (
        <Modal reset={onGameReset} onClose={onCloseModal} open={openModal} />
      ) : null}

      <div>
        <div className="team-cards-container">
          <TeamCard
            setOpenModal={setOpenModal}
            setWinner={setWinner}
            maxScore={maxScore}
            score={score1}
            team={1}
            displayName={displayName1}
            displayInputValue={displayInputValue1}
            setDisplayInputValue1={setDisplayInputValue1}
            addPoints={incrementScore}
            subtractPoints={decrementScore}
            onTeamNameSubmit={onTeamNameSubmit}
          />
          <TeamCard
            setOpenModal={setOpenModal}
            setWinner={setWinner}
            maxScore={maxScore}
            score={score2}
            team={2}
            displayName={displayName2}
            displayInputValue={displayInputValue2}
            setDisplayInputValue2={setDisplayInputValue2}
            addPoints={incrementScore}
            subtractPoints={decrementScore}
            onTeamNameSubmit={onTeamNameSubmit}
          />
        </div>
        <div className="score-limit-container">
          <h2>
            {maxScore <= 0
              ? 'Enter max points for game'
              : `Game set to ${maxScore} points`}
          </h2>
          <form onSubmit={onSubmitMaxScore}>
            <input
              type="number"
              placeholder="Score Limit.."
              value={maxScoreInputValue === '' ? '' : maxScoreInputValue}
              onChange={(e) => setMaxScoreInputValue(e.target.value)}
            />
          </form>
        </div>
        <div className="timer-container">
          <div className="time">
            <h1>
              {convertToMinutes(seconds) === 0
                ? '00'
                : convertToMinutes(seconds) < 10
                ? '0' + convertToMinutes(seconds)
                : convertToMinutes(seconds)}
              :
              {secondsRemaining === 0
                ? '00'
                : secondsRemaining < 10
                ? '0' + secondsRemaining
                : secondsRemaining}
              {/* {seconds === 0 ? '00' : seconds < 10 ? '0' + seconds : seconds} */}
            </h1>
          </div>
          <div className="time-controls">
            <button className="butn" onClick={onTimerToggle}>
              {playOrPause}
            </button>
            <button className="butn" onClick={onClickReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
