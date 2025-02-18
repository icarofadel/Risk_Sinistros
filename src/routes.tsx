import { Routes, Route } from 'react-router-dom'

import Home from './components/Central'
import CadSinistro from './pages/CadSinistro'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/CadSinistro" element={<CadSinistro />} />
  </Routes>
)

export default Rotas
