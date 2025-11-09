console.log("Ruta Menu cargando:", import.meta.url);
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import './componentes/estilosGenerales.css'
import Menu from './componentes/menu/menu.jsx';
import Perfil from "./componentes/perfil/page.tsx"; // 1. Importa el componente real
import PanelAdmin from "./componentes/administrador/PanelAdmin.jsx";
//constates temporales para probar el menu
const Home = () => <h2>Home</h2>;
const Ligas = () => <h2>Ligas</h2>;
const Jugadores = () => <h2>Jugadores</h2>;
const Equipos = () => <h2>Equipos</h2>;
const Ranking = () => <h2>Ranking</h2>;
const Admin =() => <h2>PanelAdmin</h2>

function App() {
  return (
    <>
    {/*menu, esto es un comentario en react*/}
    <BrowserRouter>
      <Menu />
    {/*rutas para el funcionamiento del menu,!hay que modificarlo cuando esten los componentes front-end listos*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} /> {/* 2. Ahora sí usa el componente correcto */}
        <Route path="/verLiga" element={<Ligas />} />
        <Route path="/jugadores" element={<Jugadores />} />
        <Route path="/misEquipos" element={<Equipos />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/administrador" element={<PanelAdmin />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
