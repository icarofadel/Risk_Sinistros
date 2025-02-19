import { BrowserRouter } from 'react-router-dom'
import { useEffect, useRef } from 'react'

import { GlobalCss } from './styles'

import Header from './components/Header'
import Footer from './components/Footer'
import Rotas from './routes'

function App() {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }, [])

  return (
    <>
      <GlobalCss />
      <audio ref={audioRef} autoPlay loop>
        <source src="/sons/music.mp3" type="audio/mp3" />
        Seu navegador não suporta a tag de áudio.
      </audio>
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
