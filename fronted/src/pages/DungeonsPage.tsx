import { useEffect, useState } from "react";
import * as dungeonService from "../services/Dungeon";
import type { Dungeon } from "../type/Dungeon";
import DungeonModal from "../components/DungeonModal";
import Card from "../components/Card";
export default function DungeonsPage() {
  const [dungeons, setDungeons] = useState<Dungeon[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedDungeon, setSelectedDungeon] = useState<Dungeon | null>(null);

  useEffect(() => {
    dungeonService
      .getAll()
      .then((data) => {
        setDungeons(data);
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
      <h2>Dungeons</h2>

      {dungeons.length === 0 ? (
        <p>No hay dungeons</p>
      ) : (
        dungeons.map((dungeon) => (
          <Card
            key={dungeon._id}
            titulo={dungeon.nombre}
            subtitulo={dungeon.ubicacion}
            onClick={() => setSelectedDungeon(dungeon)}
          />
        ))
      )}

      {selectedDungeon && (
        <DungeonModal
          dungeon={selectedDungeon}
          onClose={() => setSelectedDungeon(null)}
        />
      )}
    </div>
  );
}
