import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import CadSinistro from './pages/CadSinistro'
import Parceiro from './pages/NcParceiro'
import Seguro from './components/CadSeguro'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/CadSinistro" element={<CadSinistro />} />
    <Route path="/NcParceiro" element={<Parceiro />} />
    <Route path="/SiniSeguro" element={<Seguro />} />
  </Routes>
)

export default Rotas
