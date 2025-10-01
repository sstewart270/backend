const express = require("express");
const Song = require("./models/song");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// routes
const router = express.Router();

// GET /api/songs
router.get("/songs", async (req, res) => {
  try {
    const songs = await Song.find({});
    res.json(songs);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// GET /api/songs/:id
router.get("/songs/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.sendStatus(404);
    res.json(song);
  } catch (err) {
    res.status(400).send(err);
  }
});

// POST /api/songs
router.post("/songs", async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (err) {
    res.status(400).send(err);
  }
});

// PUT /api/songs/:id
router.put("/songs/:id", async (req, res) => {
  try {
    await Song.updateOne({ _id: req.params.id }, req.body);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.use("/api", router);

app.listen(3000, () => console.log("Listening on http://localhost:3000"));


