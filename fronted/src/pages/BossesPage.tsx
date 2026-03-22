import { useEffect, useState } from "react";
import * as bossService from "../services/bosses";
import type { Boss } from "../type/Boss";
import BossModal from "../components/BossModal";
import Card from "../components/Card";
export default function BossesPage() {
  const [bosses, setBosses] = useState<Boss[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBoss, setSelectedBoss] = useState<Boss | null>(null);

  const [mostrarForm, setMostrarForm] = useState(false);
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [dificultad, setDificultad] = useState<"facil" | "normal" | "dificil">(
    "facil",
  );
  const [tipo, setTipo] = useState<"world boss" | "dungeon boss" | "raid boss">(
    "world boss",
  );
  const [vida, setVida] = useState(1000);
  const [imagen, setImagen] = useState("");
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
  const crearBoss = async () => {
    if (!nombre || !ubicacion) {
      alert("Nombre y ubicación son obligatorios");
      return;
    }

    await bossService.create({
      nombre,
      ubicacion,
      dificultad,
      tipo,
      vida,
      activo: true,
      recompensas: [],
      imagen,
    });

    // limpiar formulario
    setNombre("");
    setUbicacion("");
    setVida(1000);
    setImagen("");

    // cerrar form
    setMostrarForm(false);

    // recargar lista
    const data = await bossService.getAll();
    setBosses(data);
  };
  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <button onClick={() => setMostrarForm(true)}>Crear Boss</button>
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
      {mostrarForm && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid gray",
            padding: "10px",
          }}
        >
          <h3>Crear Boss</h3>

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

          <select value={tipo} onChange={(e) => setTipo(e.target.value as any)}>
            <option value="world boss">World Boss</option>
            <option value="dungeon boss">Dungeon Boss</option>
            <option value="raid boss">Raid Boss</option>
          </select>

          <input
            type="number"
            value={vida}
            onChange={(e) => setVida(Number(e.target.value))}
          />

          <input
            placeholder="URL imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />

          <button onClick={crearBoss}>Guardar</button>

          <button onClick={() => setMostrarForm(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}
