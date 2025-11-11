import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <h1 className="hero-title">
        Futbol <span>de Fantasía</span>
      </h1>
      <p className="hero-subtitle">
        La experiencia definitiva de fútbol de fantasía
      </p>
      <p className="hero-description">
        Crea tu equipo ideal, compite con amigos y demuestra que eres el mejor estratega del fútbol. 
        Con estadísticas en tiempo real y las ligas más emocionantes de Europa.
      </p>
      <div className="hero-buttons">
        <button className="btn-primary">Comenzar Ahora</button>
        <button className="btn-secondary">Ver Jugadores</button>
      </div>
    </section>
  );
}

export default Hero;
