import {
  CampoButtons,
  CampoForm,
  Row,
  TextLabel,
  Title,
  TitleSecundario
} from '../FormCadSinistro/styles'
import Botao from '../Button'

const NcParceiros = () => (
  <form>
    <CampoForm>
      <div>
        <Title>Cadastro de NC para Parceiro</Title>
        <Row>
          <TextLabel htmlFor="NcParceiro">NC Parceiro</TextLabel>
          <input type="number" />
        </Row>
        <div>
          <Row>
            <TextLabel htmlFor="NF">Nota Fiscal</TextLabel>
            <input type="number" />
          </Row>
          <Row>
            <TextLabel htmlFor="NomeCliente">Nome do cliente</TextLabel>
            <input type="text" />
          </Row>
          <Row>
            <TextLabel htmlFor="Motivo">Motivo</TextLabel>
            <select name="Motivo" id="Motivo">
              <option value="Avaria">Avaria</option>
              <option value="Roubo">Roubo</option>
              <option value="Extravio/Falta">Extravio/Falta</option>
              <option value="Acidente">Acidente</option>
              <option value="ViolacaoLacre">Violação de lacre</option>
              <option value="QuebraProcedimento">Quebra de procedimento</option>
              <option value="PercaTemperatura">Perca de temperatura</option>
            </select>
          </Row>
          <Row>
            <TextLabel htmlFor="ValorSinistro">Valor do sinistro</TextLabel>
            <input type="" />
          </Row>
        </div>
        <TitleSecundario>Empresa do grupo</TitleSecundario>
        <div>
          <Row>
            <TextLabel htmlFor="Sacador">Sacador</TextLabel>
            <select name="sacado" id="sacado">
              <option value="IBL">Intermodal Brasíl Logística LTDA</option>
              <option value="Logic">Logic Pharma Armazéns Gerais LTDA</option>
              <option value="IBLValores">IBL Transporte de Valores LTDA</option>
            </select>
          </Row>
          <Row>
            <TextLabel htmlFor="Sacador">Sacado</TextLabel>
            <input type="text" />
          </Row>
        </div>
        <TitleSecundario>Finalização</TitleSecundario>
        <div>
          <Row className="Finalizacao">
            <TextLabel htmlFor="">Envio para a controladoria</TextLabel>
            <input type="date" />
          </Row>
          <Row className="Fatura">
            <TextLabel htmlFor="">Nº da Fatura</TextLabel>
            <input type="text" />
          </Row>
        </div>

        <CampoButtons>
          <Botao type="link" to={`/`} title="Fechar sinistro">
            Fechar sinistro
          </Botao>
          <Botao type="submit" to={`/`} title="Excluir sinistro">
            Excluir Sinistro
          </Botao>
          <Botao type="submit" to={`/`} title="Imprimir sinistro">
            Imprimir Sinistro
          </Botao>
          <Botao type="submit" to={`/`} title="Salvar">
            Salvar
          </Botao>
          <Botao type="submit" to={`/`} title="Adicionar novo sinistro">
            Adicionar novo sinistro
          </Botao>
        </CampoButtons>
      </div>
    </CampoForm>
  </form>
)

export default NcParceiros
