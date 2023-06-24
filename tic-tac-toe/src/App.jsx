import { useState } from 'react';
import "./styles.css"

function Square({ value, onSquareClick }) {


  //Declares and assigns the values of value
  //and setValue to useState(null) which will allow
  //them to remember the values that are set
  //const [value, setValue] = useState(null);
 // function handleClick() {
    //Once the button is clicked it will 
    // invoke set value which will set the
    //the buttons value to x since it will invoke
    //this function onClick.
   // setValue('X');
  //}

  //onClick will envoke the handleClick function
  //When the button is clicked, which will then set the value.
  //return <button className="square" onClick={handleClick}>{value}</button>;

  //Will return the value that the square obtains
  //The Square component will receive the 
  //passes in value prop from the Board component.
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  //Will handle users clicks
  //If the square is already full then user wont be able to change its value
  //Used to check the board state for a winner 
    //If there is a winner it will return.
  function handleClick(i) {
    //If the square that they try to click on already has
    //a value this will stop the player from mutating the value
    //effectivly enforcing the cannot change placement rule
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    //Creates a temp variable and assigns the array sliced
  //using the slice operator to it.
  //Then it assigns the i value to X and sets
  //the board state by calling setSquares.
  //The handleClick() function is used to
  //update the squares array holding your board’s state.
 
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    //Will be used to keep track of the board state
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  //Creates the tic tac toe board
  //Placed into div so that they can be organized
  //into rows. The divs has the className board-row
  //which styles each of the divs with the css

  //Sets the values to squares so that 
  //the webpage can keep track of the state
  //so now the Board component will pass the 
  //value prop down to each Square that it renders
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
   //[Array(9).fill(null)] is an array with a 
  //single item, which itself is an array of 9 nulls
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
//Shows when the game is won and there are no more turns to make.
function calculateWinner(squares) {
    //These are the diffrent winning board states
  //If all the values are equal the winner will be decided
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


/*NOTE TO SELF:::
By default, all child components re-render automatically when the state of a parent component
 changes. This includes even the child components that weren’t affected by the change. 
 Although re-rendering is not by itself noticeable to the user 
 (you shouldn’t actively try to avoid it!), you might want to skip re-rendering a part 
 of the tree that clearly wasn’t affected by it for performance reasons.

*/