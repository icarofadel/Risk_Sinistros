import { GlobalCss } from './styles'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import { useEffect, useRef } from 'react'

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
      <Header />
      <div className="container">
        <Home />
        <audio ref={audioRef} autoPlay loop>
          <source src="/sons/music.mp3" type="audio/mp3" />
          Seu navegador não suporta a tag de áudio.
        </audio>
      </div>
      <Footer />
    </>
  )
}

export default App
