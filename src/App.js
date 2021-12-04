import React, { useState, useEffect } from "react";
import Rock from "./icons/Rock";
import Paper from "./icons/Paper";
import Scissors from "./icons/Scissors";
import "./App.css";

const choices = [
  { id: 1, name: "Rock", component: Rock, beats: 2 },
  { id: 2, name: "Paper", component: Paper, beats: 3 },
  { id: 3, name: "Scissors", component: Scissors, beats: 1 },
];

export default function App() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    // const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    // setComputerChoice(randomChoice);
    restartGame();
  }, []);

  useEffect(() => {
    restartGame();
  }, []);

  function restartGame() {
    setGameState(null);
    setPlayerChoice(null);
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  }

  function handleClick(choice) {
    const userChoice = choices.find((c) => c.id === choice);
    setPlayerChoice(userChoice);

    //check if player wins
    if (userChoice.beats === computerChoice.id) {
      setLosses(losses + 1);
      setGameState("loss");
    } else if (userChoice.id === computerChoice.id) {
      setGameState("draw");
    } else {
      setWins(wins + 1);
      setGameState("win");
    }
  }

  function renderComponent(choice) {
    const Component = choice.component;
    return <Component />;
  }
  return (
    <div className="app">
      {/* information goes here */}
      <div className="info">
        <h2>Rock. Paper. Scissors</h2>

        {/* wins vs losses stats */}
        <div className="wins-losses">
          <div className="wins">
            <span className="number">{wins}</span>
            <span className="text">{wins === 1 ? "Win" : "Wins"}</span>
          </div>

          <div className="losses">
            <span className="number">{losses}</span>
            <span className="text">{losses === 1 ? "Loss" : "Losses"}</span>
          </div>
        </div>
      </div>

      {/* the popup to show win/loss/draw */}
      {gameState && (
        <div
          className={`game-state ${gameState}`}
          onClick={() => restartGame()}
        >
          <div>
            <div className="game-state-content">
              <p>{renderComponent(playerChoice)}</p>
              {gameState === "win" && <p>Congrats! You won!</p>}
              {gameState === "lose" && <p>Sorry! You lost!</p>}
              {gameState === "draw" && <p>You drew!</p>}
              <p>{renderComponent(computerChoice)}</p>
            </div>
            <button onClick={() => restartGame()}>Play Again</button>
          </div>
        </div>
      )}
      <div className="choices">
        {/* choices captions */}
        <div>You</div>
        <div />
        <div>Computer</div>

        {/* buttons for my choice */}
        <div>
          <button
            className="rock"
            onClick={() => {
              handleClick(1);
            }}
          >
            <Rock />
          </button>
          <button
            className="paper"
            onClick={() => {
              handleClick(2);
            }}
          >
            <Paper />
          </button>
          <button
            className="scissors"
            onClick={() => {
              handleClick(3);
            }}
          >
            <Scissors />
          </button>
        </div>

        <div className="vs">vs</div>

        {/* show the computer's choice */}
        <div>
          <button className="computer-choice">?</button>
        </div>
      </div>
    </div>
  );
}
