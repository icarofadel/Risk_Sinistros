import BuscarSinistroModal from '../BuscarSinistroModal'
import Botao from '../Button'
import * as S from './styles'

const Central = () => (
  <S.HomeSection>
    <h2>Sinistros</h2>
    <S.ContainerButtons>
      <S.Column>
        <h3>Incluir registro</h3>
        <S.ControlButtons>
          <Botao type="link" to={`/CadSinistro`} title="Cadastro de sinistro">
            Cadastrar sinistro
          </Botao>
          <Botao type="link" to={`/NcParceiro`} title="Cadastro de sinistro">
            Cadastrar NC para parceiros
          </Botao>
          <Botao type="link" to={`/SiniSeguro`} title="Cadastro de sinistro">
            Cadastrar sinistro no seguro
          </Botao>
        </S.ControlButtons>
      </S.Column>

      <S.Column>
        <h3>Consultar</h3>
        <S.ControlButtons>
          <Botao type="link" to={`/CadSinistro`} title="Consultar de sinistro">
            Consultar sinistro
          </Botao>
          <Botao type="link" to={`/CadSinistro`} title="Consultar de sinistro">
            Consultar NC para parceiros
          </Botao>
          <Botao type="link" to={`/CadSinistro`} title="Consultar de sinistro">
            Consultar sinistro no seguro
          </Botao>
        </S.ControlButtons>
      </S.Column>
    </S.ContainerButtons>

    <h3>Relatórios</h3>
    <S.ContainerRelatorio>
      <div>
        <Botao
          type="button"
          title="Buscar Sinistro"
          onClick={() => BuscarSinistroModal}
        >
          Buscar Sinistro
        </Botao>
        <Botao type="link" to={`/CadSinistro`} title="Consultar de sinistro">
          Consultar NC para parceiros
        </Botao>
        <Botao type="link" to={`/CadSinistro`} title="Consultar de sinistro">
          Consultar sinistro no seguro
        </Botao>
      </div>
    </S.ContainerRelatorio>
  </S.HomeSection>
)

export default Central
