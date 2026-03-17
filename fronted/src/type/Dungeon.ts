export interface Dungeon {
  _id?: string
  nombre: string
  ubicacion: string
  dificultad: "facil" | "normal" | "dificil"
  bossFinal: string
  nivelRecomendado: number
  activo: boolean
  fechaCreacion?: string
  recompensas: string[]
  imagen?: string
}