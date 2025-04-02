import { useState } from 'react'
import Botao from '../Button'
import { buscarSinistro } from '../../services/sinistroService'
import * as S from './styles'

const BuscarSinistroModal = ({ fechar }: { fechar: () => void }) => {
  const [query, setQuery] = useState('')
  const [resultado, setResultado] = useState<any | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  const handleSearch = async () => {
    setErro(null)
    setResultado(null)

    if (!query.trim()) {
      setErro('Digite um ID ou NF para buscar.')
      return
    }

    try {
      const data = await buscarSinistro(query)
      setResultado(data)
    } catch (error) {
      setErro('Sinistro não encontrado.')
    }
  }

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      fechar()
    }
  }

  return (
    <S.ModalWrapper onClick={handleOutsideClick}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Buscar Sinistro</h2>
        <input
          type="text"
          placeholder="Digite o ID ou NF do sinistro"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div>
          <Botao type="button" title="Buscar sinistro" onClick={handleSearch}>
            Buscar
          </Botao>
          <Botao onClick={fechar} type="button" title="Fechar busca">
            Fechar busca
          </Botao>
        </div>

        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        {resultado && (
          <div>
            <h3>Resultado:</h3>
            <p>
              <strong>ID:</strong> {resultado.id}
            </p>
            <p>
              <strong>NF:</strong> {resultado.nf}
            </p>
            <p>
              <strong>Descrição:</strong> {resultado.descricao}
            </p>
          </div>
        )}
      </S.ModalContent>
    </S.ModalWrapper>
  )
}

export default BuscarSinistroModal
