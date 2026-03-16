const mongoose = require("mongoose")

const dungeonSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  ubicacion: String,
  dificultad: {
    type: String,
    enum: ["facil", "normal", "dificil"]
  },
  bossFinal: String,
  nivelRecomendado: Number,
  imagen: String

})

const Dungeon = mongoose.model("Dungeon", dungeonSchema)

module.exports = Dungeon