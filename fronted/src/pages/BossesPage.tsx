import { useEffect, useState } from "react";
import * as bossService from "../services/bosses";
import type { Boss } from "../type/Boss";
import BossModal from "../components/BossModal";
import Card from "../components/Card";
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
        <div className="grid">
          {bosses.map((boss) => (
            <Card
              key={boss._id}
              titulo={boss.nombre}
              subtitulo={boss.ubicacion}
              imagen={boss.imagen}
              onClick={() => setSelectedBoss(boss)}
            />
          ))}
        </div>
      )}
      {selectedBoss && (
        <BossModal boss={selectedBoss} onClose={() => setSelectedBoss(null)} />
      )}
    </div>
  );
}
