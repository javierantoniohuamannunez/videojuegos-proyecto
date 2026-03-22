import type { Dungeon } from "../type/Dungeon";

type Props = {
  dungeon: Dungeon;
  onClose: () => void;
};
export default function DungeonModal({ dungeon, onClose }: Props) {
  return (
    <div style={estiloOverlay}>
      <div style={estiloModal}>
        <button onClick={onClose}>X</button>

        <h2>{dungeon.nombre}</h2>
        <p>
          <strong>Ubicación:</strong> {dungeon.ubicacion}
        </p>
        <p>
          <strong>Dificultad:</strong> {dungeon.dificultad}
        </p>
        <p>
          <strong>Tipo:</strong> {dungeon.bossFinal}
        </p>
        <p>
          <strong>Nivel:</strong> {dungeon.nivelRecomendado}
        </p>

        <h4>Recompensas:</h4>
        <ul>
          {dungeon.recompensas.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
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

