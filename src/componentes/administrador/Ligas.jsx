import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Ligas() {
  const [ligas, setLigas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    min: "",
    max: "",
  });

  // ================================
  // Cargar usuario actual
  // ================================
  const obtenerUsuario = async () => {
    const { data } = await supabase.auth.getUser();
    return data?.user?.id || null;
  };

  // ================================
  // Cargar ligas
  // ================================
  const cargarLigas = async () => {
    const { data, error } = await supabase.from("ligas").select("*");

    if (!error) setLigas(data);
    else console.log(error);
  };

  useEffect(() => {
    cargarLigas();
  }, []);

  // ================================
  // Manejador de inputs
  // ================================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================================
  // Crear código aleatorio
  // ================================
  const generarCodigo = () =>
    Math.random().toString(36).substring(2, 7).toUpperCase();

  // ================================
  // Crear liga
  // ================================
  const crearLiga = async () => {
    const user_id = await obtenerUsuario();

    const { error } = await supabase.from("ligas").insert([
      {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        codigo: generarCodigo(),
        creador_id: user_id,
        created_at: new Date(),
      },
    ]);

    if (error) {
      console.log(error);
      return;
    }

    cargarLigas();
    resetForm();
  };

  // ================================
  // Activar edición
  // ================================
  const activarEdicion = (liga) => {
    setModoEdicion(true);
    setIdEditando(liga.id_ligas);

    setFormData({
      nombre: liga.nombre,
      descripcion: liga.descripcion,
    });
  };

  // ================================
  // Guardar edición
  // ================================
  const guardarEdicion = async () => {
    const { error } = await supabase
      .from("ligas")
      .update({
        nombre: formData.nombre,
        descripcion: formData.descripcion,
      })
      .eq("id_ligas", idEditando);

    if (error) {
      console.log(error);
      return;
    }

    cargarLigas();
    resetForm();
    setModoEdicion(false);
    setIdEditando(null);
  };

  // ================================
  // Eliminar liga
  // ================================
  const borrarLiga = async (id) => {
    await supabase.from("ligas").delete().eq("id_ligas", id);
    cargarLigas();
  };

  // ================================
  // Reset form
  // ================================
  const resetForm = () => {
    setFormData({
      nombre: "",
      descripcion: "",
      min: "",
      max: "",
    });
  };

  // ================================
  // Submit form
  // ================================
  const handleSubmit = (e) => {
    e.preventDefault();
    modoEdicion ? guardarEdicion() : crearLiga();
  };

  return (
    <div className="panel">
      {/* LISTA */}
      <div className="lista">
        <h2>Ligas Creadas</h2>

        {ligas.map((l) => (
          <div key={l.id_ligas} className="card">
            <div className="info">
              <strong>{l.nombre}</strong>
              <p>Código: {l.codigo}</p>
              <p>Creada: {new Date(l.created_at).toLocaleDateString()}</p>
            </div>

            <div className="acciones">
              <button className="editar" onClick={() => activarEdicion(l)}>
                Editar
              </button>

              <button className="borrar" onClick={() => borrarLiga(l.id_ligas)}>
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FORMULARIO */}
      <div className="formulario">
        <h2>{modoEdicion ? "Editar liga" : "Crear nueva liga"}</h2>

        <form onSubmit={handleSubmit}>
          <label>Nombre de la liga</label>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Liga 2025/2026"
          />

          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describe tu liga..."
            rows={3}
          ></textarea>

          <button type="submit" className="crear">
            {modoEdicion ? "Guardar Cambios" : "Crear Liga"}
          </button>
        </form>
      </div>
    </div>
  );
}