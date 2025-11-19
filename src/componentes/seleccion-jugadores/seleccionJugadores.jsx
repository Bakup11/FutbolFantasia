import React, { useState } from "react";
import "./seleccionJugadores.css";

const jugadoresData = [
  {
    id: 1,
    nombre: "Jude Bellingham",
    equipo: "Real Madrid",
    edad: 21,
    posicion: "MC",
    resistencia: 88,
    velocidad: 82,
    agilidad: 89,
    precio: 85,
    imagen: "../public/jude.jpg",
  },
  {
    id: 2,
    nombre: "Pedri Gonzales",
    equipo: "FC Barcelona",
    edad: 21,
    posicion: "MC",
    resistencia: 85,
    velocidad: 78,
    agilidad: 92,
    precio: 75,
    imagen: "../public/pedri.jpg",
  },
  {
    id: 3,
    nombre: "Vinícius Jr",
    equipo: "Real Madrid",
    edad: 24,
    posicion: "EL",
    resistencia: 82,
    velocidad: 96,
    agilidad: 94,
    precio: 90,
    imagen: "../public/vini.png",
  },
];

export default function SeleccionJugadores() {
  const [seleccionados, setSeleccionados] = useState([]);
  const presupuestoTotal = 500;
  const presupuestoUsado = seleccionados.reduce(
    (acc, jugador) => acc + jugador.precio,
    0
  );
  const presupuestoRestante = presupuestoTotal - presupuestoUsado;

  const toggleJugador = (jugador) => {
    if (seleccionados.includes(jugador)) {
      setSeleccionados(seleccionados.filter((j) => j.id !== jugador.id));
    } else {
      setSeleccionados([...seleccionados, jugador]);
    }
  };

  return (
    // Se reemplazó min-h-screen bg... por .seleccion-container
    <div className="seleccion-container">

      <h1 className="titulo">Arma tu equipo</h1>
      
      <p className="subtitulo">
        Selecciona al menos 5 jugadores para continuar
      </p>

      <div className="indicadores">
        <div className="badge">
          <span>{seleccionados.length}</span> Seleccionados
        </div>
        <div className="badge">
          {/* Tu CSS .badge span ya tiene el color cyan, no hace falta clase extra */}
          <span>€{presupuestoRestante}</span> Presupuesto
        </div>
      </div>

      <div className="jugadores-grid">
        {jugadoresData.map((jugador) => {
          const seleccionado = seleccionados.includes(jugador);
          return (
            <div
              key={jugador.id}
              // Lógica condicional usando las clases .card y .seleccionado
              className={`card ${seleccionado ? "seleccionado" : ""}`}
            >
              {/* Eliminé el div wrapper del header para que el text-align center de .card funcione directo */}
              <img
                src={jugador.imagen}
                alt={jugador.nombre}
                // La clase .card img ya maneja el tamaño y borde
              />
              <h3>{jugador.nombre}</h3>
              
              <p className="info">
                {jugador.equipo} — {jugador.posicion}
              </p>
              <p className="edad">{jugador.edad} años</p>

              <div className="stats">
                <StatBox label="Resistencia" value={jugador.resistencia} />
                <StatBox label="Velocidad" value={jugador.velocidad} />
                <StatBox label="Agilidad" value={jugador.agilidad} />
              </div>

              <div className="card-footer">
                {/* Cambié span por strong porque tu CSS usa .card-footer strong */}
                <strong>€{jugador.precio} M</strong>
                
                <button onClick={() => toggleJugador(jugador)}>
                  {seleccionado ? "Deseleccionar" : "Seleccionar"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Componente auxiliar ajustado a la estructura del CSS
function StatBox({ label, value }) {
  return (
    <div>
      {/* El CSS .stats span estiliza el número */}
      <span>{value}</span>
      {/* El CSS .stats p estiliza la etiqueta (label) */}
      <p>{label}</p>
    </div>
  );
}