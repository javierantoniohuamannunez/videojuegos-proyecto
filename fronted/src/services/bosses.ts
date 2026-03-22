import axios from "axios";
import type { Boss } from "../type/Boss";

const BASE_URL = "http://localhost:3001/api/bosses";

//get pedir todo los bosses
export const getAll = async (): Promise<Boss[]> => {
    const res = await axios.get<Boss[]>(BASE_URL);
    return res.data;
};

//get por id
export const getById = async (id: string): Promise<Boss> => {
    const res = await axios.get<Boss>(`${BASE_URL}/${id}`);
    return res.data;
};
// POST crear
export const create = async (boss: Boss): Promise<Boss> => {
  const res = await axios.post(BASE_URL, boss)
  return res.data
}

// PUT actualizar
export const update = async (id: string, boss: Boss): Promise<Boss> => {
  const res = await axios.put(`${BASE_URL}/${id}`, boss)
  return res.data
}

// DELETE
export const remove = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`)
}
