import { useEffect, useState } from 'react';
import { supabaseJuan } from '../../lib/supabase';
import './equipos.css';

function Equipos() {
  const [ligas, setLigas] = useState([]);
  const [ligaSeleccionada, setLigaSeleccionada] = useState(null);
  const [equipos, setEquipos] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const [equipoActivo, setEquipoActivo] = useState(null);
  const LIMITE_EQUIPOS = 3;

  useEffect(() => {
    const fetchLigas = async () => {
      const { data, error } = await supabaseJuan.from('ligas').select('*');
      if (error) console.error('Error al cargar ligas:', error);
      else setLigas(data);
    };
    fetchLigas();
  }, []);

  useEffect(() => {
    if (!ligaSeleccionada) return;
    const fetchEquipos = async () => {
      const { data, error } = await supabaseJuan
        .from('equipos')
        .select('*')
        .eq('liga_id', ligaSeleccionada);
      if (error) console.error('Error al cargar equipos:', error);
      else setEquipos(data);
    };
    fetchEquipos();
  }, [ligaSeleccionada]);

  const verEquipo = async (equipoId) => {
    setEquipoActivo(equipoId);
    const { data, error } = await supabaseJuan
      .from('jugadores')
      .select('*')
      .eq('equipo_id', equipoId);
    if (error) console.error('Error al cargar jugadores:', error);
    else setJugadores(data);
  };

  const crearEquipo = async () => {
    if (!ligaSeleccionada) {
      alert("Primero selecciona una liga.");
      return;
    }
    if (equipos.length >= LIMITE_EQUIPOS) {
      alert("Ya alcanzaste el límite de equipos.");
      return;
    }
    const nombre = prompt("Nombre del nuevo equipo:");
    if (!nombre) return;

    const { error } = await supabaseJuan.from('equipos').insert({
      nombre_equipo: nombre,
      liga_id: ligaSeleccionada,
      usuario_id: 'juan123'
    });

    if (error) console.error("Error al crear equipo:", error);
    else {
      alert("Equipo creado correctamente.");
      const { data } = await supabaseJuan
        .from('equipos')
        .select('*')
        .eq('liga_id', ligaSeleccionada);
      setEquipos(data);
    }
  };

  const agregarJugador = async () => {
    if (!equipoActivo) {
      alert("Primero selecciona un equipo.");
      return;
    }
    const nombre = prompt("Nombre del jugador:");
    const puntos = parseInt(prompt("Puntos iniciales:"), 10);
    const descripcion = prompt("Descripción del jugador:");
    if (!nombre || isNaN(puntos)) return;

    const { error } = await supabaseJuan.from('jugadores').insert({
      nombre,
      puntos,
      descripcion,
      equipo_id: equipoActivo
    });

    if (error) console.error("Error al agregar jugador:", error);
    else {
      alert("Jugador agregado correctamente.");
      verEquipo(equipoActivo);
    }
  };

  const borrarJugador = async (jugadorId) => {
    await supabaseJuan.from('jugadores').delete().eq('id', jugadorId);
    verEquipo(equipoActivo);
  };

  const cambiarJugador = async (jugadorId) => {
    const nuevoNombre = prompt('Nuevo nombre del jugador:');
    if (!nuevoNombre) return;
    await supabaseJuan
      .from('jugadores')
      .update({ nombre: nuevoNombre })
      .eq('id', jugadorId);
    verEquipo(equipoActivo);
  };

  const verDescripcion = (jugador) => {
    alert(`Descripción de ${jugador.nombre}:\n${jugador.descripcion}`);
  };

  return (
    <div className="equipos-container">
      <h2>Mi equipo por liga</h2>

      <label>Selecciona una liga:</label>
      <select onChange={(e) => setLigaSeleccionada(e.target.value)} defaultValue="">
        <option value="" disabled>-- Elige una liga --</option>
        {ligas.map((liga) => (
          <option key={liga.id} value={liga.id}>{liga.nombre}</option>
        ))}
      </select>

      {ligaSeleccionada && (
        <>
          <h3>Equipos en esta liga</h3>
          <button onClick={crearEquipo}>Crear nuevo equipo</button>
          {equipos.length >= LIMITE_EQUIPOS && (
            <p style={{ color: 'red' }}>⚠️ Límite de {LIMITE_EQUIPOS} equipos alcanzado</p>
          )}
          <ul>
            {equipos.map((equipo) => (
              <li key={equipo.id}>
                {equipo.nombre_equipo}
                <button onClick={() => verEquipo(equipo.id)}>Ver equipo</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {jugadores.length > 0 && (
        <>
          <h3>Jugadores del equipo</h3>
          <button onClick={agregarJugador}>Agregar jugador</button>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
            {jugadores.map((jugador) => (
              <div key={jugador.id} className="card-jugador">
                <h4>{jugador.nombre}</h4>
                <p>Puntos: {jugador.puntos}</p>
                <button onClick={() => verDescripcion(jugador)}>Ver descripción</button>
                <button onClick={() => cambiarJugador(jugador.id)}>Cambiar jugador</button>
                <button onClick={() => borrarJugador(jugador.id)}>Borrar jugador</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Equipos;

