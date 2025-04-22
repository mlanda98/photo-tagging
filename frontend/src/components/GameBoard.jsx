import { useCallback, useEffect, useRef, useState } from "react";
import TargetBox from "./TargetBox.jsx";

const characters = [
  { name: "broccoli", x: 545, y: 467, width: 200, height: 840 },
  { name: "carrot", x: 500, y: 1046, width: 200, height: 840 },
  { name: "chicken", x: 507, y: 786, width: 200, height: 840 },
  { name: "sun", x: 615, y: 161, width: 200, height: 840 },
];

const GameBoard = () => {
  const [target, setTarget] = useState(null);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [topScorers, setTopScorers] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState("");

  useEffect(() => {
    setStartTime(Date.now());

    const storedScores = JSON.parse(localStorage.getItem("topScorers")) || [];
    setTopScorers(storedScores);
  }, []);

  const timerRef = useRef(null);

  useEffect(() => {
    const updateTimer = () => {
      if (startTime) {
        setElapsedTime(((Date.now() - startTime) / 1000).toFixed(2));
        timerRef.current = requestAnimationFrame(updateTimer);
      }
    }

    timerRef.current = requestAnimationFrame(updateTimer);

    return () => cancelAnimationFrame(timerRef.current);
  }, [startTime]);

const handleGameComplete = useCallback(() => {
    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);

    const playerName = prompt(
      `You found all characters in ${timeTaken} seconds! Enter your name`
    );

    if (playerName) {
      setTopScorers((prevScorers) => {
      const updatedScores = [...prevScorers, { name: playerName, time: parseFloat(timeTaken) }]
        .sort((a, b) => a.time - b.time)
        .slice(0, 5);

      localStorage.setItem("topScorers", JSON.stringify(updatedScores));
      return updatedScores;
    })
  }
  setTarget(null);
  setFoundCharacters([]);
  setStartTime(null);
}, [startTime]);

  useEffect(() => {
    console.log("foundCharacters updated:", foundCharacters);
    if (foundCharacters.length === characters.length) {
      console.log("end completion");
      handleGameComplete();
    }
  }, [foundCharacters, handleGameComplete]);

  
  const checkCharacterMatch = (x, y, selectedChar) => {
    console.log("Current foundCharacters before update:", foundCharacters);
    if (!x || !y || !selectedChar) return;
    console.log("Selected Character:", selectedChar);
    const char = characters.find((c) => c.name === selectedChar);
    console.log("Character Details:", char);
    console.log("Click coordinates:", x, y);
    if (
      char &&
      x >= char.x &&
      x <= char.x + char.width &&
      y >= char.y &&
      y <= char.y + char.height &&
      !foundCharacters.includes(char.name)
    ) {
      console.log("Character matched");
      setFoundCharacters((prev) => {
        if (!prev.includes(char.name)){
        const updatedCharacters = [...prev, char.name];
        console.log("updated foundCharacters:", updatedCharacters);
        return updatedCharacters;
        } else {
          console.log("Character already found:", char.name);
          return prev;
        }
      });
    } else {
      alert("Incorrect guess. Try again!");
    }
    console.log(foundCharacters);
    setTarget(null);
    setSelectedCharacter("");
  };

  const handleClick = (e) => {
    e.stopPropagation();
    const image = e.target;
    const rect = image.getBoundingClientRect();

    console.log("bounding rect", rect);

    if (rect.width === 0 || rect.height === 0) {
      console.error(
        "image rect has invalid dimensions",
        rect.width,
        rect.height
      );
      return;
    }
    const originalWidth = 1192;
    const originalHeight = 1188;

    const scaleX = originalWidth / rect.width;
    const scaleY = originalHeight / rect.height;
    console.log("Scaling Factors: ", scaleX, scaleY);
    const clickedX = (e.clientX - rect.left) * scaleX;
    const clickedY = (e.clientY - rect.top) * scaleY;

    console.log(`Scaled Click: (${clickedX}, ${clickedY})`);

    setTarget({ x: clickedX, y: clickedY });
  };

  const handleSelectCharacter = (charName) => {
    if (!target) return;

    setSelectedCharacter(charName);
    checkCharacterMatch(target.x, target.y, charName);
  };

  const handleClose = (e) => {
    if (!e.target.closest(".target-box") && !e.target.closest(".dropdown")) {
      setTarget(null);
    }
  };

  return (
    <div className="game-container" onClick={handleClose}>
      <h2>Time: {elapsedTime} seconds</h2>
      <img
        src="/game-image.png"
        alt="Game"
        className="game-image"
        onClick={(e) => {
          e.stopPropagation();
          handleClick(e);
        }}
      />
      {target && <TargetBox x={target.x} y={target.y} 
      handleSelectCharacter={checkCharacterMatch} />}

      <div className="top-scorers">
        <h3>Top Scorers:</h3>
        <ul>
          {topScorers.map((score, index) => (
            <li key={index}>
              {score.name}: {score.time}s
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GameB