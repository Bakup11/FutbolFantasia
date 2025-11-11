import React from "react";
import "./Features.css";

function Features() {
  const features = [
    {
      title: "Ligas Elite",
      desc: "La Liga y Champions League con plantillas actualizadas.",
    },
    {
      title: "Tiempo Real",
      desc: "Estadísticas y puntuaciones actualizadas al instante.",
    },
    {
      title: "Competición",
      desc: "Ligas privadas hasta 12 jugadores con ranking global.",
    },
  ];

  return (
    <section className="features">
      {features.map((item, index) => (
        <div key={index} className="feature-card">
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      ))}
    </section>
  );
}

export default Features;
