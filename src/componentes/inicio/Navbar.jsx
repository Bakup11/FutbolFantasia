import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo192.png" alt="logo" className="logo" />
        <span>Futbol de Fantasía</span>
      </div>
      <ul className="navbar-links">
        <li>Inicio</li>
        <li>Ligas</li>
        <li>Jugadores</li>
        <li>Ranking</li>
      </ul>
    </nav>
  );
}

export default Navbar;
