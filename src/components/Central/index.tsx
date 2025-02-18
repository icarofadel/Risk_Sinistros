import Botao from '../Button'
import * as S from './styles'

const Central = () => (
  <S.HomeSection>
    <h2>Sinistros</h2>
    <S.ControlButtons>
      <Botao type="link" to={`/CadSinistro`} title="Cadastro de sinistro">
        Cadastrar sinistro
      </Botao>
      <Botao type="link" to={`/CadSinistro`} title="Cadastro de sinistro">
        Cadastrar NC para parceiros
      </Botao>
      <Botao type="link" to={`/CadSinistro`} title="Cadastro de sinistro">
        Cadastrar sinistro no seguro
      </Botao>
    </S.ControlButtons>
  </S.HomeSection>
)

export default Central
