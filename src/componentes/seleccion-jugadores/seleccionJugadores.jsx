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
    imagen: "../public/vini.jpg",
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
    <div className="min-h-screen bg-[#0d1117] text-white px-8 py-12">
      <h1 className="text-4xl font-bold text-center text-cyan-400 mb-2">
        Arma tu equipo
      </h1>
      <p className="text-center text-gray-400 mb-8">
        Selecciona al menos 5 jugadores para continuar
      </p>

      <div className="flex justify-center gap-4 mb-12">
        <div className="bg-gray-800 px-6 py-3 rounded-full">
          <span className="text-cyan-400 font-semibold">
            {seleccionados.length}
          </span>{" "}
          Seleccionados
        </div>
        <div className="bg-gray-800 px-6 py-3 rounded-full">
          <span className="text-cyan-400 font-semibold">
            €{presupuestoRestante}
          </span>{" "}
          Presupuesto
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {jugadoresData.map((jugador) => {
          const seleccionado = seleccionados.includes(jugador);
          return (
            <div
              key={jugador.id}
              className={`w-72 p-6 rounded-2xl shadow-lg ${
                seleccionado
                  ? "bg-teal-800/50 border border-cyan-400"
                  : "bg-gray-800"
              }`}
            >
              <div className="flex flex-col items-center mb-4">
                <img
                  src={jugador.imagen}
                  alt={jugador.nombre}
                  className="w-20 h-20 rounded-full mb-3"
                />
                <h3 className="font-bold text-lg">{jugador.nombre}</h3>
                <p className="text-sm text-gray-400">
                  {jugador.equipo} — {jugador.posicion}
                </p>
                <p className="text-sm text-gray-500">{jugador.edad} años</p>
              </div>

              <div className="flex justify-around mb-4">
                <StatBox label="Resistencia" value={jugador.resistencia} />
                <StatBox label="Velocidad" value={jugador.velocidad} />
                <StatBox label="Agilidad" value={jugador.agilidad} />
              </div>

              <div className="flex justify-between items-center">
                <span className="font-bold text-cyan-400">
                  €{jugador.precio} M
                </span>
                <button
                  onClick={() => toggleJugador(jugador)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    seleccionado
                      ? "bg-gray-700 text-white"
                      : "bg-cyan-500 hover:bg-cyan-600 text-black"
                  }`}
                >
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

function StatBox({ label, value }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl font-bold text-cyan-400">{value}</span>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  );
}