import React, { useState } from "react";
import "./jugadores.css";

export default function Jugadores() {
  const [jugadores, setJugadores] = useState([
    { id: 1, nombre: "Jude Bellingham", equipo: "Real Madrid", posicion: "MC", precio: 85, foto: "https://cdn.sofifa.net/players/252/371/24_120.png" },
    { id: 2, nombre: "Pedri", equipo: "FC Barcelona", posicion: "MC", precio: 75, foto: "https://cdn.sofifa.net/players/253/005/24_120.png" },
    { id: 3, nombre: "Vinicius Jr", equipo: "Real Madrid", posicion: "EI", precio: 90, foto: "https://cdn.sofifa.net/players/238/794/24_120.png" },

  ]);

  const [alineacion, setAlineacion] = useState({
    portero: [],
    defensas: [],
    medios: [],
    delanteros: [],
  });

  const [nombreEquipo] = useState("Los Galacticos");

  // --- nuevo: jugador seleccionado para touch
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);

  const onDragStart = (e, jugador) => {
    e.dataTransfer.setData("jugador", JSON.stringify(jugador));
  };

  const onDrop = (e, zona) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("jugador");
    if (!data) return; // seguridad
    const jugador = JSON.parse(data);

    // evita duplicados
    if (alineacion[zona].some((j) => j.id === jugador.id)) return;

    setAlineacion((prev) => ({
      ...prev,
      [zona]: [...prev[zona], jugador],
    }));

    setJugadores((prev) => prev.filter((j) => j.id !== jugador.id));
  };

  const onDragOver = (e) => e.preventDefault();

  // 🔁 Devolver jugador al listado
  const devolverJugador = (jugador, zona) => {
    setAlineacion((prev) => ({
      ...prev,
      [zona]: prev[zona].filter((j) => j.id !== jugador.id),
    }));
    setJugadores((prev) => [...prev, jugador]);
  };

  // --- manejo touch: colocar jugador seleccionado en zona tocada
  const handleZonaClick = (zona) => {
    if (!jugadorSeleccionado) return;
    // evita duplicados
    if (alineacion[zona].some((j) => j.id === jugadorSeleccionado.id)) {
      setJugadorSeleccionado(null);
      return;
    }

    setAlineacion((prev) => ({
      ...prev,
      [zona]: [...prev[zona], jugadorSeleccionado],
    }));

    setJugadores((prev) => prev.filter((j) => j.id !== jugadorSeleccionado.id));
    setJugadorSeleccionado(null);
  };

  const calcularValorPlantilla = () => {
    const todos = [
      ...alineacion.portero,
      ...alineacion.defensas,
      ...alineacion.medios,
      ...alineacion.delanteros,
    ];
    return todos.reduce((total, j) => total + (j.precio || 0), 0);
  };

  const totalJugadores =
    alineacion.portero.length +
    alineacion.defensas.length +
    alineacion.medios.length +
    alineacion.delanteros.length;

  return (
    <div className="contenedor-jugadores">
      {/* 🏟️ Cancha */}
      <div className="campo">
        <h2 className="nombre-equipo">{nombreEquipo}</h2>

        <div
          className="zona portero"
          onClick={() => handleZonaClick("portero")}
          onDrop={(e) => onDrop(e, "portero")}
          onDragOver={onDragOver}
        >
          <h4>Portero</h4>
          {alineacion.portero.map((j) => (
            <JugadorMini
              key={j.id}
              jugador={j}
              onClick={() => devolverJugador(j, "portero")}
            />
          ))}
        </div>

        <div
          className="zona defensas"
          onClick={() => handleZonaClick("defensas")}
          onDrop={(e) => onDrop(e, "defensas")}
          onDragOver={onDragOver}
        >
          <h4>Defensas</h4>
          {alineacion.defensas.map((j) => (
            <JugadorMini
              key={j.id}
              jugador={j}
              onClick={() => devolverJugador(j, "defensas")}
            />
          ))}
        </div>

        <div
          className="zona medios"
          onClick={() => handleZonaClick("medios")}
          onDrop={(e) => onDrop(e, "medios")}
          onDragOver={onDragOver}
        >
          <h4>Medios</h4>
          {alineacion.medios.map((j) => (
            <JugadorMini
              key={j.id}
              jugador={j}
              onClick={() => devolverJugador(j, "medios")}
            />
          ))}
        </div>

        <div
          className="zona delanteros"
          onClick={() => handleZonaClick("delanteros")}
          onDrop={(e) => onDrop(e, "delanteros")}
          onDragOver={onDragOver}
        >
          <h4>Delanteros</h4>
          {alineacion.delanteros.map((j) => (
            <JugadorMini
              key={j.id}
              jugador={j}
              onClick={() => devolverJugador(j, "delanteros")}
            />
          ))}
        </div>

        {/* 💰 Información inferior */}
        <div className="info-inferior">
          <p><strong>Valor total:</strong> €{calcularValorPlantilla()}M</p>
          <p><strong>Jugadores:</strong> {totalJugadores}</p>
          {/* indica selección en touch */}
          {jugadorSeleccionado && (
            <p style={{ marginTop: 8, color: "#aeeaff" }}>
              Seleccionado: <strong>{jugadorSeleccionado.nombre}</strong> — toca una zona para colocar
            </p>
          )}
        </div>
      </div>

      {/* 📋 Lista lateral */}
      <div className="plantilla">
        <h2>Plantilla disponible</h2>
        <div className="lista-jugadores">
          {jugadores.map((j) => (
            <div
              key={j.id}
              className="jugador-card"
              draggable
              onDragStart={(e) => onDragStart(e, j)}
              onClick={() => {
                // selección con click/touch: si ya está seleccionado, deselecciona
                setJugadorSeleccionado((prev) => (prev?.id === j.id ? null : j));
              }}
              onTouchStart={() => {
                // soporte touch: selecciona el jugador al tocar
                setJugadorSeleccionado((prev) => (prev?.id === j.id ? null : j));
              }}
            >
              <img src={j.foto} alt={j.nombre} />
              <div>
                <strong>{j.nombre}</strong>
                <p>{j.equipo}</p>
                <span>{j.posicion}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function JugadorMini({ jugador, onClick }) {
  return (
    <div className="jugador-mini" onClick={onClick}>
      <img src={jugador.foto} alt={jugador.nombre} />
      <span>{jugador.nombre}</span>
    </div>
  );
}
