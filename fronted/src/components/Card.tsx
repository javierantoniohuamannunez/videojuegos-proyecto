type Props={
    titulo: string,
    subtitulo: string
    onClick: () => void
}
export default function Card({titulo, subtitulo, onClick}: Props) {
  return (
    <div onClick={onClick}
        style={{
           border: "1px solid gray",
        padding: "10px",
        marginBottom: "10px",
        cursor: "pointer"
        }}>
            <h3>{titulo}</h3><h3>{subtitulo}</h3>
        </div>
  );
}