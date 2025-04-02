import { useState } from 'react'
import Botao from '../Button'
import { buscarSinistroPorNF } from '../../services/sinistroService'
import * as S from './styles'

const BuscarSinistroModal = ({ fechar }: { fechar: () => void }) => {
  const [notaFiscal, setNotaFiscal] = useState('')
  const [resultado, setResultado] = useState<any | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  const handleSearch = async () => {
    setErro(null)
    setResultado(null)

    if (!notaFiscal.trim()) {
      setErro('Digite a Nota Fiscal para buscar.')
      return
    }

    try {
      const data = await buscarSinistroPorNF(notaFiscal)
      setResultado(data)
    } catch (error) {
      setErro('Sinistro não encontrado.')
    }
  }

  return (
    <S.ModalWrapper>
      <S.ModalContent>
        <h2>Buscar Sinistro</h2>
        <input
          type="text"
          placeholder="Digite a Nota Fiscal"
          value={notaFiscal}
          onChange={(e) => setNotaFiscal(e.target.value)}
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
              <strong>ID:</strong> {resultado.idSinistro}
            </p>
            <p>
              <strong>Nota Fiscal:</strong> {resultado.notaFiscal}
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
