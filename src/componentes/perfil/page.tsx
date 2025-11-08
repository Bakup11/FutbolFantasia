import React, { useState } from 'react';
import './perfil.css'; // Asegúrate de crear este archivo para el CSS

const Perfil = () => {
  // Estado para manejar el formulario de cambio de contraseña
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  // Estado para mensajes de feedback (ej: éxito o error)
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  // Datos de ejemplo para el perfil (pueden venir de un contexto global o una API)
  const userData = {
    teamName: 'VARtibataFC',
    motto: '"Nada está perdido hasta que corrijo la última nota en la taberna."',
    ranking: 3,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * 💾 Función para manejar el cambio de contraseña
   * ESTA ES LA PARTE DONDE DEBES HACER LA LLAMADA A LA BASE DE DATOS
   */
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setFeedback({ message: '', type: '' }); // Limpiar feedback anterior

    const { currentPassword, newPassword, confirmNewPassword } = passwordForm;

    // 1. Validaciones básicas
    if (newPassword !== confirmNewPassword) {
      setFeedback({ message: 'La nueva contraseña y su confirmación no coinciden.', type: 'error' });
      return;
    }

    if (newPassword.length < 6) {
      setFeedback({ message: 'La nueva contraseña debe tener al menos 6 caracteres.', type: 'error' });
      return;
    }

    // --- 👇 LLAMADA A LA BASE DE DATOS O API 👇 ---
    
    // Aquí es donde harías la petición a tu API de backend (Ej: Express, Python, etc.)
    // para actualizar la contraseña del usuario.
    
    console.log('Datos a enviar al backend:', {
      currentPassword,
      newPassword,
    });
    
    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Incluir token de autenticación si usas (Ej: 'Authorization': `Bearer ${token}`)
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      // Simulación de una respuesta exitosa
      if (response.ok) {
        // const data = await response.json();
        setFeedback({ message: 'Contraseña cambiada exitosamente.', type: 'success' });
        setPasswordForm({ // Limpiar el formulario
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
      } else {
        // Manejar errores de la API (Ej: Contraseña actual incorrecta)
        // const errorData = await response.json();
        setFeedback({ message: 'Error al cambiar la contraseña. Verifica tu contraseña actual.', type: 'error' });
      }

    } catch (error) {
      // Manejar errores de red o del servidor
      setFeedback({ message: 'Ocurrió un error de conexión. Inténtalo de nuevo.', type: 'error' });
      console.error('Error en la petición:', error);
    }
    
    // --- 👆 FIN DE LA LLAMADA A LA BASE DE DATOS O API 👆 ---

  };

  const handleLogout = () => {
    // Aquí harías la lógica para cerrar la sesión (limpiar tokens, redirigir, etc.)
    console.log('Cerrando Sesión...');
    // Ejemplo: history.push('/login');
  };

  return (
    <div className="perfil-container">
      <header className="perfil-header">
        <h1>Perfil</h1>
        <p>Gestiona tu información personal y configuración de cuenta</p>
      </header>

      <div className="profile-card">
        {/* Sección de Información del Equipo */}
        <h2 className="team-name">{userData.teamName}</h2>
        <blockquote className="motto">
          {userData.motto}
        </blockquote>
        <p className="ranking">
          Puesto #{userData.ranking} en el Ranking Global
        </p>

        <hr className="divider" />
        
        {/* Sección de Cambio de Contraseña */}
        <h3 className="section-title">Cambiar Contraseña</h3>
        
        <form className="password-form" onSubmit={handleChangePassword}>
          
          {/* Mensajes de feedback */}
          {feedback.message && (
            <p className={`feedback-message ${feedback.type}`}>
              {feedback.message}
            </p>
          )}

          <input
            type="password"
            name="currentPassword"
            placeholder="Contraseña Actual"
            value={passwordForm.currentPassword}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="Nueva Contraseña"
            value={passwordForm.newPassword}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Confirmar Nueva Contraseña"
            value={passwordForm.confirmNewPassword}
            onChange={handleInputChange}
            required
          />

          <button type="submit" className="btn-primary">
            Cambiar Contraseña
          </button>
        </form>

        <hr className="divider" />

        {/* Botón de Cerrar Sesión */}
        <button className="btn-secondary" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Perfil;