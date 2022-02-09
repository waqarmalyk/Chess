import { useState } from "react";
import { Chessboard } from "react-chessboard";
import Chess from "chess.js";
import "./App.css";

function App() {
  const [game, setGame] = useState(new Chess());

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();

    if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
      return;

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);

    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex]);
    });
  }

  function onDrop(sourceSquare, targetSquare) {
    let move = null;
    safeGameMutate((game) => {
      move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
    });

    if (move === null) return false;
    setTimeout(makeRandomMove, 200);
    return true;
  }
  return (
    <div className="app">
      <Chessboard position={game.fen()} onPieceDrop={onDrop} />;
    </div>
  );
}
export default App;
