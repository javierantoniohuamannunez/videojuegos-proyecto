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

  const [filtroDificultad, setFiltroDificultad] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

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

  //crearBosses
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

  //eliminarBoss
  const eliminarBoss = async (id: string) => {
    await bossService.remove(id);

    const data = await bossService.getAll();
    setBosses(data);
    setSelectedBoss(null);
  };
  //editarbosses
  const editarBoss = async (bossActualizado: Boss) => {
    await bossService.update(bossActualizado._id!, bossActualizado);

    const data = await bossService.getAll();
    setBosses(data);
    setSelectedBoss(null);
  };

  const bossesFiltrados = bosses.filter((boss) => {
    return (
      (filtroDificultad === "" || boss.dificultad === filtroDificultad) &&
      (filtroTipo === "" || boss.tipo === filtroTipo)
    );
  });

  if (loading) return <p className="text-center mt-4">Cargando...</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Bosses</h1>

      <button
        className="btn btn-primary mb-3"
        onClick={() => setMostrarForm(true)}
      >
        Crear Boss
      </button>

      {mostrarForm && (
        <div className="card p-3 mb-4">
          <h3>Crear Boss</h3>

          <input
            className="form-control mb-2"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Ubicación"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />

          <select
            className="form-select mb-2"
            value={dificultad}
            onChange={(e) => setDificultad(e.target.value as any)}
          >
            <option value="facil">Fácil</option>
            <option value="normal">Normal</option>
            <option value="dificil">Difícil</option>
          </select>

          <select
            className="form-select mb-2"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as any)}
          >
            <option value="world boss">World Boss</option>
            <option value="dungeon boss">Dungeon Boss</option>
            <option value="raid boss">Raid Boss</option>
          </select>

          <input
            className="form-control mb-2"
            type="number"
            value={vida}
            onChange={(e) => setVida(Number(e.target.value))}
          />

          <input
            className="form-control mb-2"
            placeholder="URL imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />

          <button className="btn btn-success me-2" onClick={crearBoss}>
            Guardar
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => setMostrarForm(false)}
          >
            Cancelar
          </button>
        </div>
      )}

      <div className="mb-4">
        <h5>Filtros</h5>

        <select
          className="form-select mb-2"
          onChange={(e) => setFiltroDificultad(e.target.value)}
        >
          <option value="">Todas las dificultades</option>
          <option value="facil">Fácil</option>
          <option value="normal">Normal</option>
          <option value="dificil">Difícil</option>
        </select>

        <select
          className="form-select"
          onChange={(e) => setFiltroTipo(e.target.value)}
        >
          <option value="">Todos los tipos</option>
          <option value="world boss">World Boss</option>
          <option value="dungeon boss">Dungeon Boss</option>
          <option value="raid boss">Raid Boss</option>
        </select>
      </div>

      <div className="row">
        {bossesFiltrados.map((boss) => (
          <div key={boss._id} className="col-md-3 mb-4">
            <Card
              titulo={boss.nombre}
              subtitulo={boss.ubicacion}
              imagen={boss.imagen}
              onClick={() => setSelectedBoss(boss)}
            />
          </div>
        ))}
      </div>

      {selectedBoss && (
        <BossModal
          boss={selectedBoss}
          onClose={() => setSelectedBoss(null)}
          onUpdate={editarBoss}
          onDelete={() => eliminarBoss(selectedBoss._id!)}
        />
      )}
    </div>
  );
}
