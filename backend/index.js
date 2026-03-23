require("dotenv").config();
require("./mongo");

const express = require("express");
const cors = require("cors");

const notFound = require("./middlewares/notFound");
const handleErrors = require("./middlewares/handleErrors");

const Boss = require("./models/Boss");
const Dungeon = require("./models/Dungeon");

const app = express();

app.use(cors());
app.use(express.json());

// GET todos los bosses
app.get("/api/bosses", async (req, res, next) => {
  try {
    const bosses = await Boss.find({});
    res.json(bosses);
  } catch (error) {
    next(error);
  }
});

// POST crear boss
app.post("/api/bosses", async (req, res, next) => {
  try {
    const nuevoBoss = new Boss(req.body);

    const bossGuardado = await nuevoBoss.save();

    res.status(201).json(bossGuardado);
  } catch (error) {
    next(error);
  }
});

// GET boss por ID
app.get("/api/bosses/:id", async (req, res, next) => {
  try {
    const boss = await Boss.findById(req.params.id);

    if (boss) {
      res.json(boss);
    } else {
      next(); // pasa a notFound
    }
  } catch (error) {
    next(error);
  }
});

// PUT actualizar boss
app.put("/api/bosses/:id", async (req, res, next) => {
  try {
    const resultado = await Boss.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (resultado) {
      res.json(resultado);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

// DELETE boss
app.delete("/api/bosses/:id", async (req, res, next) => {
  try {
    const eliminado = await Boss.findByIdAndDelete(req.params.id);

    if (eliminado) {
      res.status(204).end();
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});


// GET todos los dungeons
app.get("/api/dungeons", async (req, res, next) => {
  try {
    const dungeons = await Dungeon.find({});
    res.json(dungeons);
  } catch (error) {
    next(error);
  }
});

// POST crear dungeon
app.post("/api/dungeons", async (req, res, next) => {
  try {
    const nuevoDungeon = new Dungeon(req.body);

    const dungeonGuardado = await nuevoDungeon.save();

    res.status(201).json(dungeonGuardado);
  } catch (error) {
    next(error);
  }
});

// GET dungeon por ID
app.get("/api/dungeons/:id", async (req, res, next) => {
  try {
    const dungeon = await Dungeon.findById(req.params.id);

    if (dungeon) {
      res.json(dungeon);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

// PUT actualizar dungeon
app.put("/api/dungeons/:id", async (req, res, next) => {
  try {
    const resultado = await Dungeon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (resultado) {
      res.json(resultado);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

// DELETE dungeon
app.delete("/api/dungeons/:id", async (req, res, next) => {
  try {
    const eliminado = await Dungeon.findByIdAndDelete(req.params.id);

    if (eliminado) {
      res.status(204).end();
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});
app.use(notFound);
app.use(handleErrors);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
