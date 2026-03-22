import { useEffect, useState } from "react";
import * as dungeonService from "../services/Dungeon";
import type { Dungeon } from "../type/Dungeon";
import DungeonModal from "../components/DungeonModal";
import Card from "../components/Card";
export default function DungeonsPage() {
  const [dungeons, setDungeons] = useState<Dungeon[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDungeon, setSelectedDungeon] = useState<Dungeon | null>(null);

  const [mostrarForm, setMostrarForm] = useState(false);

  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [dificultad, setDificultad] = useState<"facil" | "normal" | "dificil">(
    "facil",
  );
  const [bossFinal, setBossFinal] = useState("");
  const [nivelRecomendado, setNivelRecomendado] = useState(1);
  const [imagen, setImagen] = useState("");
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
  const crearDungeon = async () => {
    if (!nombre || !ubicacion || !bossFinal) {
      alert("Nombre, ubicación y boss final son obligatorios");
      return;
    }

    await dungeonService.create({
      nombre,
      ubicacion,
      dificultad,
      bossFinal,
      nivelRecomendado,
      activo: true,
      recompensas: [],
      imagen,
    });

    // limpiar
    setNombre("");
    setUbicacion("");
    setBossFinal("");
    setNivelRecomendado(1);
    setImagen("");

    // cerrar form
    setMostrarForm(false);

    // recargar
    const data = await dungeonService.getAll();
    setDungeons(data);
  };
  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <button onClick={() => setMostrarForm(true)}>Crear Dungeon</button>
      <h2>Dungeons</h2>

      {dungeons.length === 0 ? (
        <p>No hay dungeons</p>
      ) : (
        <div className="grid">
          {dungeons.map((dungeon) => (
            <Card
              key={dungeon._id}
              titulo={dungeon.nombre}
              subtitulo={dungeon.ubicacion}
              imagen={dungeon.imagen}
              onClick={() => setSelectedDungeon(dungeon)}
            />
          ))}
        </div>
      )}
      {selectedDungeon && (
        <DungeonModal
          dungeon={selectedDungeon}
          onClose={() => setSelectedDungeon(null)}
        />
      )}
      {mostrarForm && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid gray",
            padding: "10px",
          }}
        >
          <h3>Crear Dungeon</h3>

          <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            placeholder="Ubicación"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />

          <select
            value={dificultad}
            onChange={(e) => setDificultad(e.target.value as any)}
          >
            <option value="facil">Fácil</option>
            <option value="normal">Normal</option>
            <option value="dificil">Difícil</option>
          </select>

          <input
            placeholder="Boss final"
            value={bossFinal}
            onChange={(e) => setBossFinal(e.target.value)}
          />

          <input
            type="number"
            value={nivelRecomendado}
            onChange={(e) => setNivelRecomendado(Number(e.target.value))}
          />

          <input
            placeholder="URL imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />

          <button onClick={crearDungeon}>Guardar</button>

          <button onClick={() => setMostrarForm(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}
