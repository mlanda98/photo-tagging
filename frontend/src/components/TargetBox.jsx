import React from "react";
const characters = ["broccoli", "carrot", "chicken", "sun"];

const TargetBox = ({x, y, handleSelectCharacter
}) => {
  const handleSelection = async (e) => {
    const character = e.target.value;
    if (character === "Select Character") return;

    handleSelectCharacter(x, y, character);
  }
  return (
    <div className="target-box" style={{top: y, left: x}}>
      <select onChange={handleSelection}>
        <option>Select Character</option>
        {characters.map((char) => (
          <option key={char} value={char}>{char}</option>
        ))}
      </select>
    </div>
  )
}

export default TargetBox;