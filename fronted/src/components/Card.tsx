type Props = {
  titulo: string
  subtitulo: string
  imagen?: string
  onClick: () => void
}

export default function Card({ titulo, subtitulo, imagen, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        width: "300px",
        height: "180px",
        borderRadius: "10px",
        overflow: "hidden",
        cursor: "pointer",
        margin: "10px"
      }}
    >
      <img
        src={imagen || "https://via.placeholder.com/300"}
        alt={titulo}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          background: "linear-gradient(transparent, black)",
          color: "white",
          padding: "10px"
        }}
      >
        <h3>{titulo}</h3>
        <p>{subtitulo}</p>
      </div>
    </div>
  )
}