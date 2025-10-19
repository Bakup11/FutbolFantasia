import React from "react";
import "./menu.css";
import '../estilosGenerales.css';

const Menu = () => {
  return (
    <nav className="menu">
      <div className="menu__logo">
        <h1>MiApp ⚽</h1>
      </div>

      <ul className="menu__tabs">
        <li><a href="#perfil">Perfil</a></li>
        <li><a href="#equipo">Mi equipo</a></li>
        <li><a href="#ligas">Ver ligas</a></li>
        <li><a href="#ranking">Ranking</a></li>
      </ul>

      <div className="menu__auth">
        <button className="btn btn--registro">Registro</button>
        <button className="btn btn--login">Login</button>
      </div>
    </nav>
  );
};

export default Menu;
