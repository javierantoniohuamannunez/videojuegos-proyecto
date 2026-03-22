import BossesPage from "./pages/BossesPage";
import DungeonsPage from "./pages/DungeonsPage";
import { useState } from "react"

export default function App() {
  const [vista, setVista] = useState<"bosses" | "dungeons">("bosses")

  return (
    <div>
      <h1>Throne & Liberty</h1>

      <button onClick={() => setVista("bosses")}>Bosses</button>
      <button onClick={() => setVista("dungeons")}>Dungeons</button>

      {vista === "bosses" && <BossesPage />}
      {vista === "dungeons" && <DungeonsPage />}
    </div>
  )
}