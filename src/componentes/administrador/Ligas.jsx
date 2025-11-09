import React, { useState } from "react";

export default function Ligas() {
  const [ligas, setLigas] = useState([
    {
      nombre: "Liga Española 2024/2025",
      jugadores: 8,
      min: 5,
      max: 12,
      creada: "26/10/2025",
    },
    {
      nombre: "UEFA Champions League 2024/25",
      jugadores: 4,
      min: 5,
      max: 12,
      creada: "27/10/2025",
    },
  ]);

  return (
    <div className="panel">
      <div className="lista">
        <h2>Ligas Creadas</h2>
        {ligas.map((l, index) => (
          <div key={index} className="card">
            <div className="info">
              <strong>{l.nombre}</strong>
              <p>
                Jugadores: {l.jugadores}/{l.max} &nbsp; Min: {l.min} - Max:{" "}
                {l.max}
              </p>
              <p>Creada: {l.creada}</p>
            </div>
            <div className="acciones">
              <button className="editar">Editar</button>
              <button className="borrar">Borrar</button>
            </div>
          </div>
        ))}
      </div>

      <div className="formulario">
        <h2>Crear nueva liga</h2>
        <form>
          <label>Nombre de la liga</label>
          <input placeholder="Ej: Liga 2025/2026" />

          <label>Descripción</label>
          <textarea
            placeholder="Describe tu liga, reglas, premios, etc."
            rows={3}
          ></textarea>

          <label>Mínimo de jugadores</label>
          <input placeholder="5" type="number" />

          <label>Máximo de jugadores</label>
          <input placeholder="12" type="number" />

          <button type="submit" className="crear">
            Crear Liga
          </button>
        </form>
      </div>
    </div>
  );
}
