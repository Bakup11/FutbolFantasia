import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import './componentes/estilosGenerales.css'
import Menu from './componentes/menu/menu.jsx'

function App() {
  return (
    <>
    {/*menu, esto es un comentario en react*/}
    <Router>
      <Menu />
    {/*rutas para el funcionamiento del menu,!hay que modificarlo cuando esten loscomponentes front-end listos*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/verLiga" element={<Ligas />} />
        <Route path="/jugadores" element={<Jugadores />} />
        <Route path="/misEquipos" element={<Equipos />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
