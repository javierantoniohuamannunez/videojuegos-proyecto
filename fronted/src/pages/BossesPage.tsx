import { useEffect, useState } from "react";
import * as bossService from "../services/bosses";
import type { Boss } from "../type/Boss";

export default function BossesPage() {
  const [bosses, setBosses] = useState<Boss[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bossService
      .getAll()
      .then((data) => {
        setBosses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Bosses</h2>

      {bosses.length === 0 ? (
        <p>No hay bosses</p>
      ) : (
        bosses.map((boss) => (
          <div key={boss._id}>
            <h3>{boss.nombre}</h3>
            <p>{boss.ubicacion}</p>
            <p>{boss.dificultad}</p>
          </div>
        ))
      )}
    </div>
  );
}
