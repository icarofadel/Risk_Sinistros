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

import {
  cadastrarSinistro,
  atualizarSinistro,
  excluirSinistro,
  buscarSinistroParceiroPorNF
} from '../../services/sinistroParceiroService' // ajuste o caminho conforme seu projeto
import { BuscarSinistroModal } from '../BuscarSinistroModal'

const NcParceiros = () => {
  const [modalAberto, setModalAberto] = useState(false)
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

  // Para armazenar o ID do sinistro (para atualizar/excluir)
  const [sinistroId, setSinistroId] = useState<number | null>(null)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await cadastrarSinistro(formData) // Usa a função do service
      alert('Sinistro cadastrado com sucesso!')
      handleNewSinistro()
    } catch (error) {
      alert('Erro ao cadastrar sinistro')
    }
  }

  const handleExcluir = async () => {
    if (!formData.ncParceiro) {
      alert('Busque um sinistro antes de excluir.')
      return
    }
    try {
      await excluirSinistro(Number(formData.ncParceiro))
      alert('Sinistro excluído com sucesso!')
      limparFormulario()
    } catch (error) {
      alert('Erro ao excluir: ' + (error as Error).message)
    }
  }

  const handleAtualizarSinistro = async () => {
    if (!formData.ncParceiro || isNaN(Number(formData.ncParceiro))) {
      alert('Nenhum sinistro válido selecionado para atualizar.')
      return
    }

    try {
      await atualizarSinistro(Number(formData.ncParceiro), formData)
      alert('Sinistro atualizado com sucesso!')
    } catch (error) {
      alert('Erro ao atualizar o sinistro.')
    }
  }

  const limparFormulario = () => {
    setFormData({
      ncParceiro: '',
      notaFiscal: '',
      nomeCliente: '',
      motivo: 'Avaria',
      valorSinistro: null,
      sacador: 'IBL',
      sacado: '',
      envioControladoria: '',
      numeroFatura: ''
    })
    setSinistroId(null)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleNewSinistro = () => {
    setFormData({
      ncParceiro: '',
      notaFiscal: '',
      nomeCliente: '',
      motivo: '',
      valorSinistro: null as number | null,
      sacador: '',
      sacado: '',
      envioControladoria: '',
      numeroFatura: ''
    })
  }

  const preencherFormulario = (dados: any) => {
    setFormData({
      ncParceiro: dados.id,
      notaFiscal: dados.notaFiscal,
      nomeCliente: dados.nomeCliente,
      motivo: dados.motivo,
      valorSinistro: dados.valorSinistro,
      sacador: dados.sacador,
      sacado: dados.sacado,
      envioControladoria: dados.dataenviocontroladoria,
      numeroFatura: dados.nfatura
    })
  }

  return (
    <div>
      {modalAberto && (
        <BuscarSinistroModal
          fechar={() => setModalAberto(false)}
          preencherFormulario={preencherFormulario}
          service={buscarSinistroParceiroPorNF} // <-- injeta a função do seu service parceiro
        />
      )}
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
                value={formData.notaFiscal || ''}
                onChange={handleInputChange}
              />
            </Row>

            <Row>
              <TextLabel htmlFor="nomeCliente">Nome do cliente</TextLabel>
              <input
                type="text"
                name="nomeCliente"
                id="nomeCliente"
                value={formData.nomeCliente || ''}
                onChange={handleInputChange}
              />
            </Row>

            <Row>
              <TextLabel htmlFor="motivo">Motivo</TextLabel>
              <select
                name="motivo"
                id="motivo"
                value={formData.motivo || ''}
                onChange={handleInputChange}
              >
                <option value="Avaria">Avaria</option>
                <option value="Roubo">Roubo</option>
                <option value="Extravio/Falta">Extravio/Falta</option>
                <option value="Acidente">Acidente</option>
                <option value="ViolacaoLacre">Violação de lacre</option>
                <option value="QuebraProcedimento">
                  Quebra de procedimento
                </option>
                <option value="PercaTemperatura">Perda de temperatura</option>
              </select>
            </Row>

            <Row>
              <TextLabel htmlFor="valorSinistro">Valor do sinistro</TextLabel>
              <NumericFormat
                id="valorSinistro"
                name="valorSinistro"
                value={formData.valorSinistro}
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
                value={formData.sacador || ''}
                onChange={handleInputChange}
              >
                <option value="IBL">Intermodal Brasíl Logística LTDA</option>
                <option value="Logic">Logic Pharma Armazéns Gerais LTDA</option>
                <option value="IBLValores">
                  IBL Transporte de Valores LTDA
                </option>
              </select>
            </Row>

            <Row>
              <TextLabel htmlFor="sacado">Sacado</TextLabel>
              <input
                type="text"
                name="sacado"
                id="sacado"
                value={formData.sacado || ''}
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
                value={formData.envioControladoria || ''}
                onChange={handleInputChange}
              />
            </Row>

            <Row className="Fatura">
              <TextLabel htmlFor="numeroFatura">Nº da Fatura</TextLabel>
              <input
                type="text"
                name="numeroFatura"
                id="numeroFatura"
                value={formData.numeroFatura || ''}
                onChange={handleInputChange}
              />
            </Row>

            <CampoButtons>
              <Botao type="button" title="Adicionar novo sinistro" to="/">
                Adicionar novo sinistro
              </Botao>

              {formData.ncParceiro && (
                <Botao
                  type="button"
                  onClick={handleAtualizarSinistro}
                  title={'Atualizar Sinistro'}
                >
                  Atualizar Sinistro
                </Botao>
              )}

              <Botao
                type="button"
                title="Buscar Sinistro"
                onClick={() => setModalAberto(true)}
              >
                Buscar Sinistro
              </Botao>

              <Botao
                type="button"
                title="Imprimir sinistro"
                onClick={handlePrint}
              >
                Imprimir Sinistro
              </Botao>
              <Botao
                type="button"
                title="Excluir sinistro"
                onClick={handleExcluir}
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
    </div>
  )
}

export default NcParceiros
