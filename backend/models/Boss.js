const mongoose = require("mongoose")

const bossSchema = new mongoose.Schema({

  //nombre de los bosses
  nombre: {
    type: String,
    required: true
  },
  //ubicacion donde aparace
  ubicacion: {
    type: String,
    required: true
  },

  dificultad: {
    type: String,
    enum: ["facil", "normal", "dificil"],
    required: true
  },
  // tipo de evento
tipo: {
  type: String,
  enum: ["world boss", "dungeon boss", "raid boss"],
  required: true
},
  //vida minima para un boss
  vida: {
    type: Number,
    required: true,
    min: 1000
  },
  //indica si el boss esta activo o no
  activo: {
    type: Boolean,
    default: false
  },
  //fecha de creacion del boss
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  //reconpensas que dropea el boss
  recompensas: {
    type: [String],
    default: []
  },

  imagen: String

})

const Boss = mongoose.model("Boss", bossSchema)

module.exports = Boss