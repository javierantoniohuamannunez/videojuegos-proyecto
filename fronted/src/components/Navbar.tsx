type Props = {
  vista: "bosses" | "dungeons"
  setVista: (v: "bosses" | "dungeons") => void
}

export default function Navbar({ vista, setVista }: Props) {
  return (
    <nav style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
      
      <button
        onClick={() => setVista("bosses")}
        style={{
          padding: "10px 20px",
          background: vista === "bosses" ? "#555" : "#333",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Bosses
      </button>

      <button
        onClick={() => setVista("dungeons")}
        style={{
          padding: "10px 20px",
          background: vista === "dungeons" ? "#555" : "#333",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Dungeons
      </button>

    </nav>
  )
}