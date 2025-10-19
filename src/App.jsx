import { useState } from 'react'
import './App.css'
import './componentes/estilosGenerales.css'
import Menu from './componentes/menu/menu'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Menu />

    </>
  )
}

export default App
