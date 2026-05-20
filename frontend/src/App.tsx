import { BrowserRouter } from 'react-router-dom'

import { GlobalCss } from './styles'

import Header from './components/Header'
import Footer from './components/Footer'
import Rotas from './routes'

function App() {
  return (
    <>
      <GlobalCss />
      <Header />
      <BrowserRouter>
        <div className="fundo">
          <div className="container">
            <Rotas />
          </div>
        </div>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
