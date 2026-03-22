import type {Boss } from "../type/Boss"

type Props={
    boss:Boss
    onClose:()=>void
}
export default function BossModal({boss,onClose}:Props) {
  return (
     <div style={estiloOverlay}>
      <div style={estiloModal}>
        <button onClick={onClose}>X</button>

        <h2>{boss.nombre}</h2>
        <p><strong>Ubicación:</strong> {boss.ubicacion}</p>
        <p><strong>Dificultad:</strong> {boss.dificultad}</p>
        <p><strong>Tipo:</strong> {boss.tipo}</p>
        <p><strong>Vida:</strong> {boss.vida}</p>

        <h4>Recompensas:</h4>
        <ul>
          {boss.recompensas.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
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
  alignItems: "center"
}

const estiloModal: React.CSSProperties = {
  background: "#222",
  padding: "20px",
  borderRadius: "10px",
  width: "400px",
  color: "white"
}