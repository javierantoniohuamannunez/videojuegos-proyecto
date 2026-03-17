const mongoose = require("mongoose")

const dungeonSchema = new mongoose.Schema({

  // Nombre de la dungeon 
  nombre: {
    type: String,
    required: true
  },

  // lugar del en el mapa
  ubicacion: {
    type: String,
    required: true
  },

  dificultad: {
    type: String,
    enum: ["facil", "normal", "dificil"], 
    required: true
  },

  // Boss final de la dungeon
  bossFinal: {
    type: String,
    required: true
  },

  // Nivel recomendado para entrar
  nivelRecomendado: {
    type: Number,
    required: true,
    min: 20
  },

  // Indica si la dungeon está activa
  activo: {
    type: Boolean,
    default: false
  },

  // Fecha de creacion
  fechaCreacion: {
    type: Date,
    default: Date.now
  },

  // Recompensas del dungeon
  recompensas: {
    type: [String],
    default: []
  },

  imagen: String

})

const Dungeon = mongoose.model("Dungeon", dungeonSchema)

module.exports = Dungeon