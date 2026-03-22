import { useEffect, useState } from "react";
import * as bossService from "../services/bosses";
import type { Boss } from "../type/Boss";

export default function BossesPage() {
  const [bosses, setBosses] = useState<Boss[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBoss, setSelectedBoss] = useState<Boss | null>(null);

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
          <div
            key={boss._id}
            onClick={() => setSelectedBoss(boss)}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            {" "}
            <h3>{boss.nombre}</h3>
            <p>{boss.ubicacion}</p>
            <p>{boss.dificultad}</p>
          </div>
        ))
      )}
      {selectedBoss && (
        <div style={{ marginTop: "30px", borderTop: "1px solid gray" }}>
          <h2>Detalle del Boss</h2>

          <h3>{selectedBoss.nombre}</h3>
          <p>
            <strong>Ubicación:</strong> {selectedBoss.ubicacion}
          </p>
          <p>
            <strong>Dificultad:</strong> {selectedBoss.dificultad}
          </p>
          <p>
            <strong>Tipo:</strong> {selectedBoss.tipo}
          </p>
          <p>
            <strong>Vida:</strong> {selectedBoss.vida}
          </p>

          <h4>Recompensas:</h4>
          <ul>
            {selectedBoss.recompensas.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
