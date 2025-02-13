import React from "react";
const characters = ["broccoli", "carrot", "chicken", "sun"];

const TargetBox = ({x, y}) => {
  const handleSelection = async (e) => {
    const character = e.target.value;
    if (character === "Select Character") return;

    const response = await fetch("http://localhost:5000/check-location", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({x, y, character}),
    })

    const data = await response.json();
    alert(data.correct ? "Correct" : "Wrong")
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