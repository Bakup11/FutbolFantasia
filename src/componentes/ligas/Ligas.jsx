import "./Ligas.css";
import laligaLogo from "../../assets/IMG/laliga.png";
import championsLogo from "../../assets/IMG/champions.png";
import { useNavigate } from "react-router-dom";

const Ligas = () => {
  const navigate = useNavigate();
  return (
    <div className="ligas-container">
      {/* ======= ENCABEZADO ======= */}
      <header className="ligas-header">
        <h1>Elige tu liga</h1>
        <p>
          Selecciona la competición donde quieres demostrar tu talento como
          manager
        </p>
      </header>

      {/* ======= TARJETAS ======= */}
      <div className="ligas-cards">
        {/* ===== LIGA ESPAÑOLA ===== */}
        <div className="liga-card" onClick={() => navigate('/seleccion-jugadores')}>
          <div className="card-header">
            <img src={laligaLogo} alt="Logo LaLiga" />
            <h2>Liga Española</h2>
          </div>
          <p>
            La liga más técnica del mundo. Compite con las estrellas del Real
            Madrid, Barcelona, Atlético de Madrid y más. Incluye a Bellingham,
            Pedri, Griezmann y todas las nuevas incorporaciones de la temporada.
          </p>

          <div className="card-stats">
            <div className="stat">
              <h3>20</h3>
              <span>Equipos</span>
            </div>
            <div className="stat">
              <h3>400+</h3>
              <span>Jugadores</span>
            </div>
            <div className="stat">
              <h3>38</h3>
              <span>Jornadas</span>
            </div>
          </div>
        </div>

        {/* ===== UEFA CHAMPIONS LEAGUE ===== */}
        <div className="liga-card">
          <div className="card-header">
            <img src={championsLogo} alt="Logo Champions League" />
            <h2>Uefa Champions League</h2>
          </div>
          <p>
            La máxima competición europea. Los mejores jugadores de Manchester
            City, PSG, Bayern Munich, Real Madrid y más. Con el nuevo formato
            expandido y las estrellas más brillantes del continente.
          </p>

          <div className="card-stats">
            <div className="stat">
              <h3>36</h3>
              <span>Equipos</span>
            </div>
            <div className="stat">
              <h3>800+</h3>
              <span>Jugadores</span>
            </div>
            <div className="stat">
              <h3>15</h3>
              <span>Jornadas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ligas;
