import "./menu.css";
import '../estilosGenerales.css';
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav className="menu">
      <div className="menu__logo">
        <div className="logo_agus">
          <img src="./src/componentes/IMG/Logo liga uniagustiniana.png" alt="Logo Agus"/>
        </div>
        <div className="texto_encabezado"><h1>Futbol de Fantasia</h1></div>
      </div>

      <ul className="menu__tabs">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/perfil">Perfil</Link></li>
        <li><Link to="/administrador">Admin</Link></li>
        <li><Link to="/verLiga">Ver ligas</Link></li>
        <li><Link to="/jugadores">Jugadores</Link></li>
        <li><Link to="/misEquipos">Mis Equipos</Link></li>
        <li><Link to="/ranking">Ranking</Link></li>
      </ul>
    </nav>
  );
};

export default Menu;
