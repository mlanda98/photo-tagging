import { useState } from "react";
import TargetBox from "./TargetBox.jsx";

const GameBoard = () => {
  const [target, setTarget] = useState(null);

  const handleClick = (e) => {
    e.stopPropagation();
    const image = e.target;
    const rect = image.getBoundingClientRect();

    console.log("bounding rect", rect);

    if (rect.width  === 0|| rect.height === 0){
      console.error("image rect has invalid dimensions", rect.width, rect.height);
      return;

    }
    const originalWidth = 1192;
    const originalHeight = 1188;

    console.log("Displayed Image Size:", rect.width, rect.height);
    console.log("Original Image Size:", originalWidth, originalHeight);
   

    const scaleX = originalWidth / rect.width;
    const scaleY = originalHeight / rect.height;
 console.log("Scaling Factors: ", scaleX, scaleY);
    const clickedX = (e.clientX - rect.left) * scaleX;
    const clickedY = (e.clientY - rect.top) * scaleY;

    console.log(`Scaled Click: (${clickedX}, ${clickedY})`);

    setTarget({ x: clickedX, y: clickedY });
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
