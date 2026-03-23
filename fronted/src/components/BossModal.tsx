import { useState } from "react"
import type { Boss } from "../type/Boss"

type Props = {
  boss: Boss
  onClose: () => void
  onUpdate: (bossActualizado: Boss) => void
  onDelete: () => void
}

export default function BossModal({ boss, onClose, onUpdate, onDelete }: Props) {

  const [editando, setEditando] = useState(false)

  const [nombre, setNombre] = useState(boss.nombre)
  const [ubicacion, setUbicacion] = useState(boss.ubicacion)
  const [dificultad, setDificultad] = useState(boss.dificultad)
  const [tipo, setTipo] = useState(boss.tipo)
  const [vida, setVida] = useState(boss.vida)
  const [imagen, setImagen] = useState(boss.imagen || "")

  const guardarCambios = () => {
    if (!nombre || !ubicacion) {
      alert("Nombre y ubicación obligatorios")
      return
    }

    onUpdate({
      ...boss,
      nombre,
      ubicacion,
      dificultad,
      tipo,
      vida,
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
              src={boss.imagen}
              alt={boss.nombre}
              style={{ width: "100%", borderRadius: "10px" }}
            />

            <h2>👑 {boss.nombre}</h2>
            <p><strong>🔥 Vida:</strong> {boss.vida}</p>
            <p><strong>⚔️ Tipo:</strong> {boss.tipo}</p>
            <p><strong>📍 Ubicación:</strong> {boss.ubicacion}</p>
            <p><strong>⚡ Dificultad:</strong> {boss.dificultad}</p>

            <h4>🎁 Recompensas:</h4>
            <ul>
              {boss.recompensas.map((r, i) => (
                <li key={i}>✨ {r}</li>
              ))}
            </ul>

            <button onClick={() => setEditando(true)}> Editar</button>
            <button onClick={onDelete}>Eliminar</button>
          </>
        ) : (
          <>
            <h2>Editar Boss</h2>

            <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />

            <select value={dificultad} onChange={(e) => setDificultad(e.target.value as any)}>
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
