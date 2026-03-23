import axios from "axios"
import type { Dungeon } from "../type/Dungeon"

const BASE_URL = `${import.meta.env.VITE_API_URL}/dungeons`

// GET todos
export const getAll = async (): Promise<Dungeon[]> => {
  const res = await axios.get<Dungeon[]>(BASE_URL)
  return res.data
}

// GET por ID
export const getById = async (id: string): Promise<Dungeon> => {
  const res = await axios.get<Dungeon>(`${BASE_URL}/${id}`)
  return res.data
}

// POST crear
export const create = async (dungeon: Dungeon): Promise<Dungeon> => {
  const res = await axios.post(BASE_URL, dungeon)
  return res.data
}

// PUT actualizar
export const update = async (id: string, dungeon: Dungeon): Promise<Dungeon> => {
  const res = await axios.put(`${BASE_URL}/${id}`, dungeon)
  return res.data
}

// DELETE eliminar
export const remove = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`)
}