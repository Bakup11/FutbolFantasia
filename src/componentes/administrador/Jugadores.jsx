import React, { useState, useEffect } from "react";
import supabase from "../../lib/supabase";

export default function Jugadores() {
  const [jugadores, setJugadores] = useState([]);

  // estados del formulario
  const [nombre, setNombre] = useState("");
  const [equipo, setEquipo] = useState("");
  const [precio, setPrecio] = useState("");
  const [resistencia, setResistencia] = useState("");
  const [velocidad, setVelocidad] = useState("");
  const [agilidad, setAgilidad] = useState("");

  // para saber si estamos editando
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    obtenerJugadores();
  }, []);

  const obtenerJugadores = async () => {
    const { data, error } = await supabase.from("jugadores").select("*");
    if (!error) setJugadores(data ?? []);
  };

  const crearOActualizarJugador = async (e) => {
    e.preventDefault();

    const payload = {
      nombre,
      equipo,
      precio: precio === "" ? null : Number(precio),
      resistencia: resistencia === "" ? null : Number(resistencia),
      velocidad: velocidad === "" ? null : Number(velocidad),
      agilidad: agilidad === "" ? null : Number(agilidad),
    };

    if (editId) {
      // actualizar
      const { error } = await supabase
        .from("jugadores")
        .update(payload)
        .eq("id", editId);

      if (error) {
        alert("Error al actualizar: " + error.message);
        return;
      }
      alert("Jugador actualizado correctamente");
    } else {
      // crear
      const { error } = await supabase.from("jugadores").insert([payload]);
      if (error) {
        alert("Error al crear: " + error.message);
        return;
      }
      alert("Jugador creado con éxito 🚀");
    }

    limpiarFormulario();
    obtenerJugadores();
  };

  const limpiarFormulario = () => {
    setNombre("");
    setEquipo("");
    setPrecio("");
    setResistencia("");
    setVelocidad("");
    setAgilidad("");
    setEditId(null);
  };

  const editarJugador = (j) => {
    setNombre(j.nombre);
    setEquipo(j.equipo);
    setPrecio(j.precio);
    setResistencia(j.resistencia);
    setVelocidad(j.velocidad);
    setAgilidad(j.agilidad);
    setEditId(j.id);
  };

  const borrarJugador = async (id) => {
    const confirmar = confirm("¿Seguro que quieres borrar este jugador?");
    if (!confirmar) return;

    const { error } = await supabase.from("jugadores").delete().eq("id", id);
    if (error) {
      alert("Error al borrar: " + error.message);
      return;
    }
    alert("Jugador borrado correctamente");
    obtenerJugadores();
  };

  return (
    <div className="panel">
      {/* LISTA DE JUGADORES — IZQUIERDA */}
      <div className="lista">
        <h2>Jugadores Registrados</h2>

        {jugadores.map((j) => (
          <div key={j.id} className="card">
            <div className="info">
              <strong>{j.nombre}</strong>
              <p>{j.equipo} • €{j.precio}M</p>
              <p>Resistencia: {j.resistencia}, Velocidad: {j.velocidad}, Agilidad: {j.agilidad}</p>
            </div>
            <div className="acciones">
              <button className="editar" onClick={() => editarJugador(j)}>Editar</button>
              <button className="borrar" onClick={() => borrarJugador(j.id)}>Borrar</button>
            </div>
          </div>
        ))}
      </div>

      {/* FORMULARIO — DERECHA */}
      <div className="formulario">
        <h2>{editId ? "Editar jugador" : "Crear nuevo jugador"}</h2>
        <form onSubmit={crearOActualizarJugador}>
          <label>Nombre del jugador</label>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} />

          <label>Equipo</label>
          <input value={equipo} onChange={(e) => setEquipo(e.target.value)} />

          <label>Precio (€M)</label>
          <input value={precio} onChange={(e) => setPrecio(e.target.value)} type="number" />

          <h4>Estadísticas</h4>

          <label>Resistencia</label>
          <input value={resistencia} onChange={(e) => setResistencia(e.target.value)} type="number" />

          <label>Velocidad</label>
          <input value={velocidad} onChange={(e) => setVelocidad(e.target.value)} type="number" />

          <label>Agilidad</label>
          <input value={agilidad} onChange={(e) => setAgilidad(e.target.value)} type="number" />

          <button type="submit" className="crear">
            {editId ? "Actualizar" : "Crear"}
          </button>

          {editId && (
            <button type="button" onClick={limpiarFormulario} style={{ marginLeft: "8px" }}>
              Cancelar
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
