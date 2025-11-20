import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import './equipos.css';

function Equipos() {
  const [ligas, setLigas] = useState([]);
  const [ligaSeleccionada, setLigaSeleccionada] = useState(null);
  const [jugadores, setJugadores] = useState([]);
  const [ligaActiva, setLigaActiva] = useState(null);

  // Cargar ligas
  useEffect(() => {
    const fetchLigas = async () => {
      const { data, error } = await supabase.from('ligas').select('*');
      if (error) console.error('Error al cargar ligas:', error);
      else setLigas(data);
    };
    fetchLigas();
  }, []);

  // Cargar jugadores según la liga
  useEffect(() => {
    if (!ligaSeleccionada) return;

    const fetchJugadores = async () => {
      const { data, error } = await supabase
        .from('jugadores')
        .select('*')
        .eq('id_ligas', ligaSeleccionada);

      if (error) console.error('Error al cargar jugadores:', error);
      else setJugadores(data);
    };

    fetchJugadores();
  }, [ligaSeleccionada]);

  // Crear jugador nuevo
  const agregarJugador = async () => {
    if (!ligaSeleccionada) {
      alert("Primero selecciona una liga.");
      return;
    }

    const nombre = prompt("Nombre del jugador:");
    const resistencia = parseInt(prompt("Resistencia (0-100):"));
    const velocidad = parseInt(prompt("Velocidad (0-100):"));
    const agilidad = parseInt(prompt("Agilidad (0-100):"));
    const precio = parseFloat(prompt("Precio del jugador:"));
    const equipo = prompt("Nombre del equipo del jugador:");

    if (!nombre) return;

    const { error } = await supabase.from('jugadores').insert({
      nombre,
      resistencia,
      velocidad,
      agilidad,
      precio,
      equipo,
      id_ligas: ligaSeleccionada
    });

    if (error) console.error("Error al agregar jugador:", error);
    else {
      alert("Jugador creado correctamente.");
      refrescarJugadores();
    }
  };

  // Actualizar jugadores sin cambiar liga
  const refrescarJugadores = async () => {
    const { data } = await supabase
      .from('jugadores')
      .select('*')
      .eq('id_ligas', ligaSeleccionada);

    setJugadores(data);
  };

  // Borrar jugador
  const borrarJugador = async (jugadorId) => {
    await supabase.from('jugadores').delete().eq('id', jugadorId);
    refrescarJugadores();
  };

  // Editar jugador
  const editarJugador = async (jugadorId) => {
    const nuevoNombre = prompt("Nuevo nombre del jugador:");
    if (!nuevoNombre) return;

    await supabase
      .from('jugadores')
      .update({ nombre: nuevoNombre })
      .eq('id', jugadorId);

    refrescarJugadores();
  };

  // Ver descripción completa (o estadísticas)
  const verStats = (j) => {
    alert(
      `Jugador: ${j.nombre}
Resistencia: ${j.resistencia}
Velocidad: ${j.velocidad}
Agilidad: ${j.agilidad}
Equipo: ${j.equipo}
Precio: ${j.precio}`
    );
  };

  return (
    <div className="equipos-container">
      <h2>Jugadores por liga</h2>

      <label>Selecciona una liga:</label>
      <select onChange={(e) => setLigaSeleccionada(e.target.value)} defaultValue="">
        <option value="" disabled>-- Elige una liga --</option>
        {ligas.map((liga) => (
          <option key={liga.id_ligas} value={liga.id_ligas}>
            {liga.nombre}
          </option>
        ))}
      </select>

      {ligaSeleccionada && (
        <>
          <h3>Jugadores en la liga seleccionada</h3>
          <button onClick={agregarJugador}>Agregar jugador</button>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
            {jugadores.map((j) => (
              <div key={j.id} className="card-jugador">
                <h4>{j.nombre}</h4>
                <p><b>Equipo:</b> {j.equipo}</p>
                <p><b>Precio:</b> {j.precio}</p>
                <button onClick={() => verStats(j)}>Ver estadísticas</button>
                <button onClick={() => editarJugador(j.id)}>Editar</button>
                <button onClick={() => borrarJugador(j.id)}>Borrar</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Equipos;
