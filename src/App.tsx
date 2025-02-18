import { GlobalCss } from './styles'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import { useEffect, useRef } from 'react'
import FormSinistro from './components/FormCadSinistro'

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
      <div className="fundo">
        <div className="container">
          <Home />
          <FormSinistro />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
