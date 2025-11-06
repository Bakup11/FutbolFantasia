import React from "react";
import "./menu.css";
import '../estilosGenerales.css';

const Menu = () => {
  return (
    <nav className="menu">
      <div className="menu__logo">
        <div className="logo_agus"></div>
        <h1>Futbol de Fantasia</h1>
      </div>

      <ul className="menu__tabs">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/perfil">Perfil</Link></li>
        <li><Link to="/verLiga">Ver ligas</Link></li>
        <li><Link to="/jugadores">Jugadores</Link></li>
        <li><Link to="/misEquipos">Mis Equipos</Link></li>
        <li><Link to="/ranking">Ranking</Link></li>
      </ul>

      {/*<div className="menu__auth">
        <button className="btn btn--registro">Registro</button>
        <button className="btn btn--login">Login</button>
      </div>*/}
    </nav>
  );
};

export default Menu;
