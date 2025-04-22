const express = require("express");
cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend", "build")));

const characters = [
  { name: "Broccoli", x: 545, y: 467, width: 143, height: 840 },
  { name: "Carrot", x: 500, y: 1046, width: 143, height: 840 },
  { name: "Chicken", x: 507, y: 786, width: 143, height: 840 },
  { name: "Sun", x: 615, y: 161, width: 143, height: 840 },
];

app.post("/check-location", (req, res) => {
  const { x, y, character } = req.body;

  console.log(`received scaled data: (${x}, ${y})`);

  if (!x || !y || !character) {
    return res.status(400).json({ message: "Missing x, y, or character" });
  }
  const char = characters.find(
    (c) => c.name.toLowerCase() === character.toLowerCase()
  );
  if (!char) {
    return res.status(400).json({ message: "Character not found" });
  }

  console.log(
    `character coordinates: (${char.x}, ${char.y}) with width: ${char.width} and height: ${char.height}`
  );

  console.log(`User clicked at (${x}, ${y})`);

  const isCorrect =
    x >= char.x &&
    x <= char.x + char.width &&
    y >= char.y &&
    y <= char.y + char.height;

  res.json({ correct: isCorrect });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
