const express = require("express");
const cors = require("cors");

// 1) ensure DB connects at startup (uses db.js)
const db = require("./db");

const Song = require("./models/song");

const app = express();
app.use(cors());
app.use(express.json());

// Optional: friendly root + health check
app.get("/", (req, res) => {
  res.send("Song API is running. Try GET /api/songs");
});

app.get("/api/health", (req, res) => {
  // mongoose readyState: 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
  res.json({ ok: true, db: db.connection.readyState });
});

// routes
const router = express.Router();

// GET /api/songs
router.get("/songs", async (req, res) => {
  try {
    const songs = await Song.find({});
    res.json(songs);
  } catch (err) {
    console.error(err);
    // if you need more detail while debugging, use err.message
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

// Render-compatible port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});


