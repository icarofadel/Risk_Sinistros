import { useState } from 'react'
import { NumericFormat } from 'react-number-format'
import {
  CampoButtons,
  CampoForm,
  Row,
  TextLabel,
  Title,
  TitleSecundario
} from '../FormCadSinistro/styles'
import Botao from '../Button'

const NcParceiros = () => {
  const [formData, setFormData] = useState({
    ncParceiro: '',
    notaFiscal: '',
    nomeCliente: '',
    motivo: 'Avaria',
    valorSinistro: null as number | null,
    sacador: 'IBL',
    sacado: '',
    envioControladoria: '',
    numeroFatura: ''
  })

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Enviando dados:', formData)
    alert('Formulário enviado (a implementar)')
  }

  return (
    <form onSubmit={handleSubmit}>
      <CampoForm>
        <div>
          <Title>Cadastro de NC para Parceiro</Title>

          <Row>
            <TextLabel htmlFor="ncParceiro">NC Parceiro</TextLabel>
            <input
              type="number"
              name="ncParceiro"
              id="ncParceiro"
              value={formData.ncParceiro}
              onChange={handleInputChange}
            />
          </Row>

          <Row>
            <TextLabel htmlFor="notaFiscal">Nota Fiscal</TextLabel>
            <input
              type="number"
              name="notaFiscal"
              id="notaFiscal"
              value={formData.notaFiscal}
              onChange={handleInputChange}
            />
          </Row>

          <Row>
            <TextLabel htmlFor="nomeCliente">Nome do cliente</TextLabel>
            <input
              type="text"
              name="nomeCliente"
              id="nomeCliente"
              value={formData.nomeCliente}
              onChange={handleInputChange}
            />
          </Row>

          <Row>
            <TextLabel htmlFor="motivo">Motivo</TextLabel>
            <select
              name="motivo"
              id="motivo"
              value={formData.motivo}
              onChange={handleInputChange}
            >
              <option value="Avaria">Avaria</option>
              <option value="Roubo">Roubo</option>
              <option value="Extravio/Falta">Extravio/Falta</option>
              <option value="Acidente">Acidente</option>
              <option value="ViolacaoLacre">Violação de lacre</option>
              <option value="QuebraProcedimento">Quebra de procedimento</option>
              <option value="PercaTemperatura">Perda de temperatura</option>
            </select>
          </Row>

          <Row>
            <TextLabel htmlFor="valorSinistro">Valor do sinistro</TextLabel>
            <NumericFormat
              id="valorSinistro"
              name="valorSinistro"
              value={formData.valorSinistro ?? ''}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
              onValueChange={(values) => {
                const { floatValue } = values
                setFormData((prev) => ({
                  ...prev,
                  valorSinistro: floatValue ?? null
                }))
              }}
              placeholder="R$ 0,00"
            />
          </Row>

          <TitleSecundario>Empresa do grupo</TitleSecundario>

          <Row>
            <TextLabel htmlFor="sacador">Sacador</TextLabel>
            <select
              name="sacador"
              id="sacador"
              value={formData.sacador}
              onChange={handleInputChange}
            >
              <option value="IBL">Intermodal Brasíl Logística LTDA</option>
              <option value="Logic">Logic Pharma Armazéns Gerais LTDA</option>
              <option value="IBLValores">IBL Transporte de Valores LTDA</option>
            </select>
          </Row>

          <Row>
            <TextLabel htmlFor="sacado">Sacado</TextLabel>
            <input
              type="text"
              name="sacado"
              id="sacado"
              value={formData.sacado}
              onChange={handleInputChange}
            />
          </Row>

          <TitleSecundario>Finalização</TitleSecundario>

          <Row className="Finalizacao">
            <TextLabel htmlFor="envioControladoria">
              Envio para a controladoria
            </TextLabel>
            <input
              type="date"
              name="envioControladoria"
              id="envioControladoria"
              value={formData.envioControladoria}
              onChange={handleInputChange}
            />
          </Row>

          <Row className="Fatura">
            <TextLabel htmlFor="numeroFatura">Nº da Fatura</TextLabel>
            <input
              type="text"
              name="numeroFatura"
              id="numeroFatura"
              value={formData.numeroFatura}
              onChange={handleInputChange}
            />
          </Row>

          <CampoButtons>
            <Botao type="button" title="Adicionar novo sinistro" to="/">
              Adicionar novo sinistro
            </Botao>
            <Botao type="submit" title="Salvar">
              Salvar
            </Botao>
            <Botao type="button" title="Imprimir sinistro" to="/">
              Imprimir Sinistro
            </Botao>
            <Botao
              type="button"
              title="Excluir sinistro"
              to="/"
              className="botaoFechar"
            >
              Excluir Sinistro
            </Botao>
            <Botao
              type="link"
              title="Fechar sinistro"
              to={`/`}
              className="botaoFechar"
            >
              Fechar sinistro
            </Botao>
          </CampoButtons>
        </div>
      </CampoForm>
    </form>
  )
}

export default NcParceiros
