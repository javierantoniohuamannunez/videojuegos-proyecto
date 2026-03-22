import BossesPage from "./pages/BossesPage";
import DungeonsPage from "./pages/DungeonsPage";
import { useState } from "react";
import Navbar from "./components/Navbar";
export default function App() {
  const [vista, setVista] = useState<"bosses" | "dungeons">("bosses");

  return (
    <div>
      <h1>Throne & Liberty</h1>

      <Navbar vista={vista} setVista={setVista} />
      {vista === "bosses" && <BossesPage />}
      {vista === "dungeons" && <DungeonsPage />}
    </div>
  );
}
