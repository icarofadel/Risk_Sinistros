import { useState } from 'react'
import InputMask from 'react-input-mask'
import { NumericFormat } from 'react-number-format'
import * as S from '../../styles'
import Botao from '../Button'

import {
  cadastrarSinistro,
  atualizarSinistro,
  excluirSinistro,
  buscarSinistroParceiroPorNF,
  baixarCartaSinistro
} from '../../services/sinistroParceiroService'
import { BuscarSinistroModal } from '../BuscarSinistroModal'

const NcParceiros = () => {
  const [modalAberto, setModalAberto] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    dataOcorrencia: '',
    notaFiscal: '',
    nomeCliente: '',
    motivo: 'Avaria',
    valorSinistro: null as number | null,
    sacador: 'IBL',
    sacado: '',
    cnpjSacado: '',
    envioControladoria: '',
    nFatura: ''
  })

  // Para armazenar o ID do sinistro (para atualizar/excluir)
  const [sinistroId, setSinistroId] = useState<number | null>(null)

  const handleInputChange = (name: string, value: string) => {
    const onlyDigits = name === 'CnpjSacado' ? value.replace(/\D/g, '') : value
    setFormData((prev) => ({
      ...prev,
      [name]: onlyDigits
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
    if (!formData.id) {
      alert('Busque um sinistro antes de excluir.')
      return
    }

    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este sinistro?'
    )
    if (!confirmar) return

    try {
      await excluirSinistro(Number(formData.id))
      alert('Sinistro excluído com sucesso!')
      limparFormulario()
    } catch (error) {
      alert('Erro ao excluir: ' + (error as Error).message)
      console.error(error)
    }
  }

  const handleAtualizarSinistro = async () => {
    if (!formData.id || isNaN(Number(formData.id))) {
      alert('Nenhum sinistro válido selecionado para atualizar.')
      return
    }

    try {
      await atualizarSinistro(Number(formData.id), formData)
      alert('Sinistro atualizado com sucesso!')
    } catch (error) {
      alert('Erro ao atualizar o sinistro.')
    }
  }

  const limparFormulario = () => {
    setFormData({
      id: '',
      dataOcorrencia: '',
      notaFiscal: '',
      nomeCliente: '',
      motivo: 'Avaria',
      valorSinistro: null,
      sacador: 'IBL',
      sacado: '',
      cnpjSacado: '',
      envioControladoria: '',
      nFatura: ''
    })
    setSinistroId(null)
  }

  const handleNewSinistro = () => {
    setFormData({
      id: '',
      dataOcorrencia: '',
      notaFiscal: '',
      nomeCliente: '',
      motivo: '',
      valorSinistro: null as number | null,
      sacador: '',
      sacado: '',
      cnpjSacado: '',
      envioControladoria: '',
      nFatura: ''
    })
  }

  const preencherFormulario = (dados: any) => {
    setFormData({
      id: dados.id,
      dataOcorrencia: dados.dataOcorrencia,
      notaFiscal: dados.notaFiscal,
      nomeCliente: dados.nomeCliente,
      motivo: dados.motivo,
      valorSinistro: dados.valorSinistro,
      sacador: dados.sacador,
      sacado: dados.sacado,
      cnpjSacado: dados.cnpjSacado,
      envioControladoria: dados.dataenviocontroladoria,
      nFatura: dados.nFatura
    })
  }

  const handleDownloadCarta = async () => {
    if (!formData.id || isNaN(Number(formData.id))) {
      alert('ID do sinistro inválido para gerar a carta.')
      return
    }

    try {
      const blob = await baixarCartaSinistro(Number(formData.id))
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'carta-sinistro.pdf')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error(error)
      alert('Erro ao baixar a carta')
    }
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
        <S.CampoForm>
          <div>
            <S.Title>Cadastro de NC para Parceiro</S.Title>
            <S.Row>
              <S.TextLabel htmlFor="id">NC Parceiro</S.TextLabel>
              <input
                type="number"
                name="id"
                id="id"
                value={formData.id}
                onChange={(e) => handleInputChange('id', e.target.value)}
              />
            </S.Row>
            <S.Row>
              <S.TextLabel htmlFor="dataOcorrencia">
                Data da ocorrência
              </S.TextLabel>
              <input
                type="date"
                name="dataOcorrencia"
                id="dataOcorrencia"
                value={formData.dataOcorrencia || ''}
                onChange={(e) =>
                  handleInputChange('dataOcorrencia', e.target.value)
                }
              />
            </S.Row>
            <S.Row>
              <S.TextLabel htmlFor="notaFiscal">Nota Fiscal</S.TextLabel>
              <input
                type="number"
                name="notaFiscal"
                id="notaFiscal"
                value={formData.notaFiscal || ''}
                onChange={(e) =>
                  handleInputChange('notaFiscal', e.target.value)
                }
              />
            </S.Row>

            <S.Row>
              <S.TextLabel htmlFor="nomeCliente">Nome do cliente</S.TextLabel>
              <input
                type="text"
                name="nomeCliente"
                id="nomeCliente"
                value={formData.nomeCliente || ''}
                onChange={(e) =>
                  handleInputChange('nomeCliente', e.target.value)
                }
              />
            </S.Row>

            <S.Row>
              <S.TextLabel htmlFor="motivo">Motivo</S.TextLabel>
              <select
                name="motivo"
                id="motivo"
                value={formData.motivo || ''}
                onChange={(e) => handleInputChange('motivo', e.target.value)}
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
            </S.Row>

            <S.Row>
              <S.TextLabel htmlFor="valorSinistro">
                Valor do sinistro
              </S.TextLabel>
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
            </S.Row>

            <S.TitleSecundario>Empresa do grupo</S.TitleSecundario>

            <S.Row>
              <S.TextLabel htmlFor="sacador">Sacador</S.TextLabel>
              <select
                name="sacador"
                id="sacador"
                value={formData.sacador || ''}
                onChange={(e) => handleInputChange('sacador', e.target.value)}
              >
                <option value="Intermodal Brasíl Logística LTDA">
                  Intermodal Brasíl Logística LTDA
                </option>
                <option value="Logic Pharma Armazéns Gerais LTDA">
                  Logic Pharma Armazéns Gerais LTDA
                </option>
                <option value="IBL Transporte de Valores LTDA">
                  IBL Transporte de Valores LTDA
                </option>
              </select>
            </S.Row>

            <S.Row>
              <S.TextLabel htmlFor="sacado">Sacado</S.TextLabel>
              <input
                type="text"
                name="sacado"
                id="sacado"
                value={formData.sacado || ''}
                onChange={(e) => handleInputChange('sacado', e.target.value)}
              />
            </S.Row>

            <S.Row>
              <S.TextLabel htmlFor="cnpjSacado">CNPJ Sacado</S.TextLabel>
              <InputMask
                mask="99.999.999/9999-99"
                value={formData.cnpjSacado || ''}
                onChange={(e) =>
                  handleInputChange(
                    'cnpjSacado',
                    e.target.value.replace(/\D/g, '')
                  )
                }
              >
                {(inputProps: any) => (
                  <input
                    {...inputProps}
                    type="text"
                    name="cnpjSacado"
                    id="cnpjSacado"
                  />
                )}
              </InputMask>
            </S.Row>

            <S.TitleSecundario>Finalização</S.TitleSecundario>

            <S.Row className="Finalizacao">
              <S.TextLabel htmlFor="envioControladoria">
                Envio para a controladoria
              </S.TextLabel>
              <input
                type="date"
                name="envioControladoria"
                id="envioControladoria"
                value={formData.envioControladoria || ''}
                onChange={(e) =>
                  handleInputChange('envioControladoria', e.target.value)
                }
              />
            </S.Row>

            <S.Row className="Fatura">
              <S.TextLabel htmlFor="nFatura">Nº da Fatura</S.TextLabel>
              <input
                type="text"
                name="nFatura"
                id="nFatura"
                value={formData.nFatura || ''}
                onChange={(e) => handleInputChange('nFatura', e.target.value)}
              />
            </S.Row>

            <S.CampoButtons>
              <Botao
                type="button"
                title="Adicionar novo sinistro"
                onClick={handleNewSinistro}
              >
                Adicionar novo sinistro
              </Botao>

              <Botao type="submit" title="Salvar">
                Salvar
              </Botao>

              {formData.id && (
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
                title="Gerar NC Parceiro"
                onClick={handleDownloadCarta}
              >
                Gerar NC Parceiro
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
            </S.CampoButtons>
          </div>
        </S.CampoForm>
      </form>
    </div>
  )
}

export default NcParceiros
