import React, { useState } from "react";

export default function Jugadores() {
  const [jugadores, setJugadores] = useState([
    {
      nombre: "Jude Bellingham",
      equipo: "Real Madrid",
      posicion: "MC",
      edad: 21,
      precio: 85,
      resistencia: 88,
      velocidad: 82,
      agilidad: 89,
    },
    {
      nombre: "Pedri Gonzalez",
      equipo: "FC Barcelona",
      posicion: "MC",
      edad: 21,
      precio: 75,
      resistencia: 85,
      velocidad: 78,
      agilidad: 92,
    },
    {
      nombre: "Vinicius Jr",
      equipo: "Real Madrid",
      posicion: "EI",
      edad: 24,
      precio: 90,
      resistencia: 82,
      velocidad: 96,
      agilidad: 94,
    },
  ]);

  return (
    <div className="panel">
      <div className="lista">
        <h2>Jugadores Registrados</h2>
        {jugadores.map((j, index) => (
          <div key={index} className="card">
            <div className="info">
              <strong>{j.nombre}</strong>
              <p>
                {j.equipo} • {j.posicion} • {j.edad} años • €{j.precio}M
              </p>
              <p>
                Resistencia: {j.resistencia}, Velocidad: {j.velocidad},
                Agilidad: {j.agilidad}
              </p>
            </div>
            <div className="acciones">
              <button className="editar">Editar</button>
              <button className="borrar">Borrar</button>
            </div>
          </div>
        ))}
      </div>

      <div className="formulario">
        <h2>Crear nuevo jugador</h2>
        <form>
          <label>Nombre del jugador</label>
          <input placeholder="Ej: Cristiano Ronaldo" />

          <label>Equipo</label>
          <input placeholder="Ej: Al-Nassr F. C." />

          <label>Posición</label>
          <select>
            <option>Seleccionar Posición</option>
            <option>DC</option>
            <option>MC</option>
            <option>EI</option>
            <option>ED</option>
          </select>

          <label>Edad</label>
          <input placeholder="Ej: 25" type="number" />

          <label>Precio (€M)</label>
          <input placeholder="Ej: 90" type="number" />

          <h4>Estadísticas</h4>
          <label>Resistencia</label>
          <input placeholder="Ej: 85" type="number" />

          <label>Velocidad</label>
          <input placeholder="Ej: 95" type="number" />

          <label>Agilidad</label>
          <input placeholder="Ej: 92" type="number" />

          <label>Foto del jugador</label>
          <input type="file" accept="image/png, image/jpeg" />

          <button type="submit" className="crear">
            Crear Jugador
          </button>
        </form>
      </div>
    </div>
  );
}
