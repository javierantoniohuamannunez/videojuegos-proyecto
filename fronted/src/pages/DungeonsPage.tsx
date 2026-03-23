import { useEffect, useState } from "react"
import * as dungeonService from "../services/Dungeon"
import type { Dungeon } from "../type/Dungeon"
import DungeonModal from "../components/DungeonModal"
import Card from "../components/Card"

export default function DungeonsPage() {

  const [dungeons, setDungeons] = useState<Dungeon[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDungeon, setSelectedDungeon] = useState<Dungeon | null>(null)

  const [mostrarForm, setMostrarForm] = useState(false)
  const [nombre, setNombre] = useState("")
  const [ubicacion, setUbicacion] = useState("")
  const [dificultad, setDificultad] = useState<"facil" | "normal" | "dificil">("facil")
  const [bossFinal, setBossFinal] = useState("")
  const [nivelRecomendado, setNivelRecomendado] = useState(1)
  const [imagen, setImagen] = useState("")

  const [filtroDificultad, setFiltroDificultad] = useState("")

  useEffect(() => {
    dungeonService.getAll()
      .then(data => {
        setDungeons(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])
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
  const editarDungeon = async (dungeonActualizado: Dungeon) => {
    await dungeonService.update(dungeonActualizado._id!, dungeonActualizado);

    const data = await dungeonService.getAll();
    setDungeons(data);
    setSelectedDungeon(null);
  };
  const eliminarDungeon = async (id: string) => {
    await dungeonService.remove(id);

    const data = await dungeonService.getAll();
    setDungeons(data);
    setSelectedDungeon(null);
  };
  const dungeonsFiltrados = dungeons.filter(d =>
    filtroDificultad === "" || d.dificultad === filtroDificultad
  )
 if (loading) return <p className="text-center mt-4">Cargando...</p>

  return (
    <div className="container mt-4">

      <h1 className="mb-4">Dungeons</h1>

      <button
        className="btn btn-primary mb-3"
        onClick={() => setMostrarForm(true)}
      >
         Crear Dungeon
      </button>

      {mostrarForm && (
        <div className="card p-3 mb-4">
          <h3>Crear Dungeon</h3>

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

          <input
            className="form-control mb-2"
            placeholder="Boss final"
            value={bossFinal}
            onChange={(e) => setBossFinal(e.target.value)}
          />

          <input
            className="form-control mb-2"
            type="number"
            value={nivelRecomendado}
            onChange={(e) => setNivelRecomendado(Number(e.target.value))}
          />

          <input
            className="form-control mb-2"
            placeholder="URL imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />

          <button className="btn btn-success me-2" onClick={crearDungeon}>
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
        <h5>Filtro por dificultad</h5>

        <select
          className="form-select"
          onChange={(e) => setFiltroDificultad(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="facil">Fácil</option>
          <option value="normal">Normal</option>
          <option value="dificil">Difícil</option>
        </select>
      </div>

      <div className="row">
        {dungeonsFiltrados.map(dungeon => (
          <div key={dungeon._id} className="col-md-3 mb-4">
            <Card
              titulo={dungeon.nombre}
              subtitulo={dungeon.ubicacion}
              imagen={dungeon.imagen}
              onClick={() => setSelectedDungeon(dungeon)}
            />
          </div>
        ))}
      </div>

      {selectedDungeon && (
        <DungeonModal
          dungeon={selectedDungeon}
          onClose={() => setSelectedDungeon(null)}
          onUpdate={editarDungeon}
          onDelete={() => eliminarDungeon(selectedDungeon._id!)}
        />
      )}

    </div>
  )
}