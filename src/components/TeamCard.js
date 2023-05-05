import React from 'react';

export function TeamCard({
  setWinner,
  score,
  maxScore,
  team,
  addPoints,
  subtractPoints,
  displayName,
  onTeamNameSubmit,
  displayInputValue,
  setDisplayInputValue1,
  setDisplayInputValue2,
}) {
  if (score === maxScore) {
    setWinner(true);
  }

  const checkNameLength = (name) => {
    if (name.length === 0) {
      if (team === 1) {
        return 'Home';
      } else {
        return 'Guest';
      }
    } else {
      return name;
    }
  };

  return (
    <div className="team-content">
      <h1 className={score === maxScore ? 'score victory' : 'score'}>
        {score}
      </h1>
      <div className="score-button-container">
        <button
          name={`score${team}`}
          className="butn button-increment"
          onClick={(e) => addPoints(team, e.target.name)}
        >
          +
        </button>
        <button
          className="butn button-decrement"
          onClick={() => subtractPoints(team)}
        >
          -
        </button>
      </div>

      <form onSubmit={(e) => onTeamNameSubmit(team, e)}>
        <input
          className="team-content-input"
          placeholder="Team Name"
          type="text"
          name={displayInputValue}
          value={displayInputValue}
          onChange={(e) => {
            team === 1
              ? setDisplayInputValue1(e.target.value)
              : setDisplayInputValue2(e.target.value);
          }}
        />
      </form>
      <br />
      <span className="team-name">{checkNameLength(displayName)}</span>
    </div>
  );
}
