import React from "react";
const characters = ["broccoli", "carrot", "chicken", "sun"];

const TargetBox = ({x, y}) => {
  return (
    <div className="target-box" style={{top: y, left: x}}>
      <select onChange={(e) => alert(`You chose ${e.target.value}`)}>
        <option>Select Character</option>
        {characters.map((char) => (
          <option key={char} value={char}>{char}</option>
        ))}
      </select>
    </div>
  )
}

export default TargetBox;