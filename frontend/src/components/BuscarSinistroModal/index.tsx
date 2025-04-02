import { useState } from 'react'
import { buscarSinistroPorNF } from '../../services/sinistroService'
import * as S from './styles'
import Botao from '../Button'

const BuscarSinistroModal = ({
  fechar,
  preencherFormulario
}: {
  fechar: () => void
  preencherFormulario: (dados: any) => void
}) => {
  const [notaFiscal, setNotaFiscal] = useState('')
  const [erro, setErro] = useState<string | null>(null)

  const handleSearch = async () => {
    setErro(null)

    if (!notaFiscal.trim()) {
      setErro('Digite a Nota Fiscal para buscar.')
      return
    }

    try {
      const data = await buscarSinistroPorNF(notaFiscal)
      preencherFormulario(data) // Passa os dados do sinistro para o formulário
      fechar() // Fecha o modal após buscar
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
      </S.ModalContent>
    </S.ModalWrapper>
  )
}

export default BuscarSinistroModal
