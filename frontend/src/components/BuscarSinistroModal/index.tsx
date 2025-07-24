import { useState } from 'react'
import * as S from './styles'
import Botao from '../Button'

interface BuscarSinistroModalProps {
  fechar: () => void
  preencherFormulario: (dados: any) => void
  buscarPorNF: (nf: string) => Promise<any> // generalizado
}
export const BuscarSinistroModal = ({
  fechar,
  preencherFormulario,
  service
}: {
  fechar: () => void
  preencherFormulario: (dados: any) => void
  service: (notaFiscal: string) => Promise<any>
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
      const data = await service(notaFiscal) // <-- usando o service genérico
      preencherFormulario(data)
      fechar()
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
          <Botao
            onClick={fechar}
            type="button"
            title="Fechar busca"
            className="botaoFechar"
          >
            Fechar busca
          </Botao>
        </div>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
      </S.ModalContent>
    </S.ModalWrapper>
  )
}
