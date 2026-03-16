const mongoose = require("mongoose")

const bossSchema = new mongoose.Schema({

  nombre: {
    type: String,
    required: true
  },
  ubicacion: String,
  dificultad: {
    type: String,
    enum: ["facil", "normal", "dificil"]
  },
  tipo: String,
  vida: Number,
  imagen: String
})

const Boss = mongoose.model("Boss", bossSchema)
module.exports = Boss