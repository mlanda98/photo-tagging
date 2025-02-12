import { useState } from "react";
import TargetBox from "./TargetBox.jsx";

const GameBoard = () => {
  const [target, setTarget] = useState(null);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTarget({x, y});
  }

  const handleClose = () => {
    setTarget(null);
  }

  return (
    <div className="game-container" onClick={handleClose}>
      <img
      src="/game-image.png"
        alt="Game"
        className="game-image"
        onClick={(e) => {
          e.stopPropagation(); 
          handleClick(e);
        }}
      />
      {target && <TargetBox x={target.x} y={target.y} />}
    </div>
  )
}

export default GameBoard;
