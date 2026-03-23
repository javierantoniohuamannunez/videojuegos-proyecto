import BossesPage from "./pages/BossesPage";
import DungeonsPage from "./pages/DungeonsPage";
import { useState } from "react";
import Navbar from "./components/Navbar";
import logo from "./assets/TroneAndLiberty.png";
export default function App() {
  const [vista, setVista] = useState<"bosses" | "dungeons">("bosses");

  return (
    <div>
      <div style={headerStyle}>
        <div style={{ textAlign: "center" }}>
          <img
            src={logo}
            alt="logo"
            style={{ height: "180px"}}
          />
        </div>
      </div>
      <Navbar vista={vista} setVista={setVista} />
      {vista === "bosses" && <BossesPage />}
      {vista === "dungeons" && <DungeonsPage />}
    </div>
  );
}
const headerStyle: React.CSSProperties = {
  backgroundImage: "url('https://images.alphacoders.com/133/1335474.jpeg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "200px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  textShadow: "0 0 10px black",
};
