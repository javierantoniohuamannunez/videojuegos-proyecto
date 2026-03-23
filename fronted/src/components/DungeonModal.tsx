import { useState } from "react"
import type { Dungeon } from "../type/Dungeon"

type Props = {
  dungeon: Dungeon
  onClose: () => void
  onUpdate: (dungeonActualizado: Dungeon) => void
  onDelete: () => void
}

export default function DungeonModal({ dungeon, onClose, onUpdate, onDelete }: Props) {

  const [editando, setEditando] = useState(false)

  const [nombre, setNombre] = useState(dungeon.nombre)
  const [ubicacion, setUbicacion] = useState(dungeon.ubicacion)
  const [dificultad, setDificultad] = useState(dungeon.dificultad)
  const [bossFinal, setBossFinal] = useState(dungeon.bossFinal)
  const [nivelRecomendado, setNivelRecomendado] = useState(dungeon.nivelRecomendado)
  const [imagen, setImagen] = useState(dungeon.imagen || "")

  const guardarCambios = () => {
    if (!nombre || !ubicacion || !bossFinal) {
      alert("Nombre, ubicación y boss final son obligatorios")
      return
    }

    onUpdate({
      ...dungeon,
      nombre,
      ubicacion,
      dificultad,
      bossFinal,
      nivelRecomendado,
      imagen
    })

    setEditando(false)
  }

   return (
    <div style={estiloOverlay}>
      <div style={estiloModal}>

        <button onClick={onClose} style={{ float: "right" }}>✖</button>

        {!editando ? (
          <>
            <img
              src={dungeon.imagen}
              alt={dungeon.nombre}
              style={{ width: "100%", borderRadius: "10px" }}
            />

            <h2>🏰 {dungeon.nombre}</h2>

            <p><strong>📍 Ubicación:</strong> {dungeon.ubicacion}</p>
            <p><strong>⚡ Dificultad:</strong> {dungeon.dificultad}</p>
            <p><strong>👑 Boss Final:</strong> {dungeon.bossFinal}</p>
            <p><strong>🎯 Nivel:</strong> {dungeon.nivelRecomendado}</p>

            <h4>🎁 Recompensas:</h4>
            <ul>
              {dungeon.recompensas.map((r, i) => (
                <li key={i}>✨ {r}</li>
              ))}
            </ul>

            <button onClick={() => setEditando(true)}>Editar</button>
            <button onClick={onDelete}>Eliminar</button>
          </>
        ) : (
          <>
            <h2>Editar Dungeon</h2>

            <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />

            <select value={dificultad} onChange={(e) => setDificultad(e.target.value as any)}>
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

            <button onClick={guardarCambios}>💾 Guardar</button>
            <button onClick={() => setEditando(false)}>Cancelar</button>
          </>
        )}

      </div>
    </div>
  )
}

const estiloOverlay: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const estiloModal: React.CSSProperties = {
  background: "#222",
  padding: "20px",
  borderRadius: "10px",
  width: "400px",
  color: "white",
};
