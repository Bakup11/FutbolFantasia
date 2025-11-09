// src/administrador/PanelAdmin.jsx
import React, { useState } from "react";
import Ligas from "./Ligas";
import Jugadores from "./Jugadores";
import "./Admin.css";

export default function PanelAdmin() {
  const [vista, setVista] = useState("jugadores"); // por defecto muestra jugadores

  return (
    <div className="panel-container">
      <h1 className="titulo">Panel Administración</h1>
      <p className="subtitulo">Gestiona ligas y jugadores</p>

      <div className="botones-top">
        <button
          className={`btn ${vista === "ligas" ? "activo" : ""}`}
          onClick={() => setVista("ligas")}
        >
          Crear Liga
        </button>
        <button
          className={`btn ${vista === "jugadores" ? "activo" : ""}`}
          onClick={() => setVista("jugadores")}
        >
          Crear Jugador
        </button>
      </div>

      <div className="contenido">
        {vista === "jugadores" ? <Jugadores /> : <Ligas />}
      </div>
    </div>
  );
}
