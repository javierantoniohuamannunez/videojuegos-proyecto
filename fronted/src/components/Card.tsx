type Props = {
  titulo: string
  subtitulo: string
  imagen?: string
  onClick: () => void
}

export default function Card({ titulo, subtitulo, imagen, onClick }: Props) {
  return (
    <div
      className="card text-white"
      onClick={onClick}
      style={{
        background: "#111",
        border: "1px solid #222",
        cursor: "pointer",
        transition: "0.3s"
      }}
    >
      <img
        src={imagen}
        alt={titulo}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover"
        }}
      />

      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text text-secondary">{subtitulo}</p>
      </div>
    </div>
  )
}