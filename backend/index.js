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

// GET OBTENER DATOS
app.get("/api/bosses", async (req, res,next) => {
  try {
    const bosses = await Boss.find({});
    res.json(bosses);
  } catch (error) {
    next(error);
  }
});

// GET CREAR BOSS
app.post("/api/bosses", async (req, res, next) => {
  try {
    const boss = req.body;

    const nuevoBoss = new Boss({
      nombre: boss.nombre,
      ubicacion: boss.ubicacion,
      dificultad: boss.dificultad,
      tipo: boss.tipo,
      vida: boss.vida,
      imagen: boss.imagen,
    });

    const bossGuardado = await nuevoBoss.save();

    res.status(201).json(bossGuardado);

  } catch (error) {
    next(error);
  }
});
// GET buscar por ID

app.get("/api/bosses/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const boss = await Boss.findById(id);

    res.json(boss);

  } catch (error) {
    next(error);
  }
});

// PUT editar boss

app.put("/api/bosses/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const bossActualizado = req.body;

    const resultado = await Boss.findByIdAndUpdate(
      id,
      bossActualizado,
      { new: true }
    );

    res.json(resultado);

  } catch (error) {
    next(error);
  }
});

//DELETE
app.delete("/api/bosses/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    await Boss.findByIdAndDelete(id);

    res.status(204).end();

  } catch (error) {
    next(error);
  }
});


/* dungeons */

app.get("/api/dungeons", async (req, res, next) => {
  try {

    const dungeons = await Dungeon.find({})

    res.json(dungeons)

  } catch (error) {
    next(error)
  }
});

app.post("/api/dungeons", async (req, res, next) => {
  try {

    const dungeon = new Dungeon(req.body)

    const dungeonGuardado = await dungeon.save()

    res.status(201).json(dungeonGuardado)

  } catch (error) {
    next(error)
  }
});

app.get("/api/dungeons/:id", async (req, res, next) => {
  try {

    const dungeon = await Dungeon.findById(req.params.id)

    res.json(dungeon)

  } catch (error) {
    next(error);
  }
});

app.put("/api/dungeons/:id", async (req, res, next) => {
  try {

    const dungeonActualizado = await Dungeon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(dungeonActualizado)

  } catch (error) {
    next(error)
  }
});

app.delete("/api/dungeons/:id", async (req, res, next) => {
  try {

    await Dungeon.findByIdAndDelete(req.params.id)

    res.status(204).end()

  } catch (error) {
    next(error)
  }
});

app.use(notFound);
app.use(handleErrors);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});