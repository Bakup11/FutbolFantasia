console.log("Ruta Menu cargando:", import.meta.url);
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import './componentes/estilosGenerales.css'
//importacion de componentes
import Menu from './componentes/menu/menu.jsx';
import Perfil from "./componentes/perfil/page.tsx"; // 1. Importa el componente real
import PanelAdmin from "./componentes/administrador/PanelAdmin.jsx";
import Jugadores from "./componentes/jugadores/Jugadores.jsx";
import Hero from "./componentes/inicio/Hero";
import SeleccionJugadores from "./componentes/seleccion-jugadores/seleccionJugadores.jsx";
import Equipos from "./componentes/equipos/equipos.jsx";
// ✅ Importar correctamente los archivos de Ligas
import Ligas from "./componentes/ligas/Ligas.jsx";
import "./componentes/ligas/Ligas.css";
import { supabaseJuan } from '/src/lib/supabase.js';

//Pruba conexion supabase base de datos Ligas
import { supabase } from '/src/lib/supabase.js';

const test = await supabase.from("ligas").select("*");
console.log(test);

//




//constates temporales para probar el menu (si tu componente tiene alguno de estos nombres solo comenta o elimina la constante de aqui abajo)
//const Home = () => <h2>Home</h2>;
const LigasTemp = () => <h2>Ligas</h2>; // 🔹 Renombrado para evitar conflicto
const JugadoresTemp = () => <h2>Jugadores</h2>;
// const Equipos = () => <h2>Equipos</h2>; era temporal 
const Ranking = () => <h2>Ranking</h2>;
//const Admin =() => <h2>PanelAdmin</h2>

function App() {
  return (
    <>
    {/*menu, esto es un comentario en react*/}
    <BrowserRouter>
      <Menu />
    {/*rutas para el funcionamiento del menu,!hay que modificarlo cuando esten los componentes front-end listos*/}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/perfil" element={<Perfil />} /> {/* 2. Ahora sí usa el componente correcto */}
        <Route path="/verLiga" element={<Ligas />} /> {/* ✅ Conecta al componente real */}
        <Route path="/jugadores" element={<Jugadores />} />
        <Route path="/misEquipos" element={<Equipos />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/administrador" element={<PanelAdmin />} />
        <Route path="/seleccion-jugadores" element={<SeleccionJugadores />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
