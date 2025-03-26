import Botao from '../Button'
import * as S from './styles'

const BuscarSinistroModal = ({ fechar }: { fechar: () => void }) => {
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      fechar()
    }
  }

  return (
    <S.ModalWrapper onClick={handleOutsideClick}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Buscar Sinistro</h2>
        <input type="text" placeholder="Digite o ID ou nome do sinistro" />
        <div>
          <Botao type={'button'} title={'Buscar sinistro'}>
            Buscar
          </Botao>
          <Botao onClick={fechar} type={'button'} title={'Fechar busca'}>
            Fechar busca
          </Botao>
        </div>
      </S.ModalContent>
    </S.ModalWrapper>
  )
}

export default BuscarSinistroModal
