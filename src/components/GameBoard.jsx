import { useState } from "react";
import TargetBox from "./TargetBox.jsx";
import characters from "../data/characters.js";

const GameBoard = () => {
  const [target, setTarget] = useState(null);

  const handleClick = (e) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTarget({ x, y });
  };

  const handleClose = (e) => {
    if (!e.target.closest(".target-box")) {
      setTarget(null);
    }
  };

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
  );
};

export default GameBoard;
