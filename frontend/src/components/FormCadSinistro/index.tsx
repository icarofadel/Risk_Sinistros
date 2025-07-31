// Pacotes externos
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import { NumericFormat } from 'react-number-format'

// Estilos
import * as S from '../../styles'

// Componentes
import Botao from '../Button'
import { BuscarSinistroModal } from '../BuscarSinistroModal'

// Serviços
import {
  atualizarSinistro,
  buscarSinistroPorNF,
  cadastrarSinistro,
  excluirSinistro
} from '../../services/sinistroService'

const FormSinistro = () => {
  const [selected, setSelected] = useState<string | null>(null)
  const [modalAberto, setModalAberto] = useState(false)

  // Dados do formulário
  const [formData, setFormData] = useState({
    id: null as number | null,
    dataOcorrencia: '',
    notaFiscal: '',
    nomeCliente: '',
    segmento: '',
    motivo: '',
    valorSinistro: null as number | null,
    responsavel1: '',
    responsavel2: '',
    status: '',
    resumo: '',
    ciaAerea: false,
    motorista: false,
    entregueFinanceiro: false,
    dataEntrega: '',
    nomeCiaAerea: '',
    awb: '',
    nomeMotorista: '',
    cpf: '',
    placa: '',
    manifesto: '',
    local: ''
  })

  const handleCheckboxChange = (value: string) => {
    setSelected((prev) => (prev === value ? null : value))
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'id' ? (value ? Number(value) : '') : value // Converte idSinistro para número
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

  const handleDelete = async () => {
    if (!formData.id) {
      alert('Informe o ID do sinistro para excluir.')
      return
    }

    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este sinistro?'
    )
    if (!confirmar) return

    try {
      await excluirSinistro(Number(formData.id))
      alert('Sinistro excluído com sucesso')
      handleNewSinistro()
    } catch (error) {
      alert('Erro ao excluir sinistro')
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

  const handlePrint = () => {
    window.print()
  }

  const handleNewSinistro = () => {
    setFormData({
      id: null,
      dataOcorrencia: '',
      notaFiscal: '',
      nomeCliente: '',
      segmento: '',
      motivo: '',
      valorSinistro: null as number | null,
      responsavel1: '',
      responsavel2: '',
      status: '',
      resumo: '',
      ciaAerea: false,
      motorista: false,
      entregueFinanceiro: false,
      dataEntrega: '',
      nomeCiaAerea: '',
      awb: '',
      nomeMotorista: '',
      cpf: '',
      placa: '',
      manifesto: '',
      local: ''
    })
  }

  const preencherFormulario = (dados: any) => {
    setFormData({
      id: dados.id,
      dataOcorrencia: dados.dataOcorrencia,
      notaFiscal: dados.notaFiscal,
      nomeCliente: dados.nomeCliente,
      segmento: dados.segmento,
      motivo: dados.motivo,
      valorSinistro: dados.valorSinistro,
      responsavel1: dados.responsavel1,
      responsavel2: dados.responsavel2,
      status: dados.status,
      resumo: dados.resumo,
      ciaAerea: dados.ciaAerea,
      motorista: dados.motorista,
      entregueFinanceiro: dados.entregueFinanceiro,
      dataEntrega: dados.dataEntrega,
      nomeCiaAerea: dados.nomeCiaAerea,
      awb: dados.awb,
      nomeMotorista: dados.nomeMotorista,
      cpf: dados.cpf,
      placa: dados.placa,
      manifesto: dados.manifesto,
      local: dados.local
    })
  }

  const [sinistroBuscado, setSinistroBuscado] = useState<
    typeof formData | null
  >(null)

  useEffect(() => {
    if (sinistroBuscado) {
      setFormData((prev) => ({
        ...prev,
        ...sinistroBuscado,
        ciaAerea: !!sinistroBuscado.ciaAerea,
        motorista: !!sinistroBuscado.motorista
      }))

      // Se ambos vierem como true, corrige para manter apenas um ativo
      if (sinistroBuscado.ciaAerea && sinistroBuscado.motorista) {
        setFormData((prev) => ({
          ...prev,
          motorista: false // Mantém apenas `ciaAerea` como true
        }))
      }

      // Define "selected" corretamente
      if (sinistroBuscado.ciaAerea) {
        setSelected('option1')
      } else if (sinistroBuscado.motorista) {
        setSelected('option2')
      } else {
        setSelected(null)
      }
    }
  }, [sinistroBuscado])

  return (
    <div>
      {modalAberto && (
        <BuscarSinistroModal
          fechar={() => setModalAberto(false)}
          preencherFormulario={preencherFormulario}
          service={buscarSinistroPorNF} // <-- injeta a função do seu service parceiro
        />
      )}
      <form onSubmit={handleSubmit}>
        <S.CampoForm>
          <div>
            <S.Title>Cadastro de Sinistro</S.Title>
            <S.Row>
              <S.TextLabel htmlFor="idSinistro">ID do Sinistro</S.TextLabel>
              <input
                type="number"
                name="id"
                value={formData.id !== null ? formData.id : ''} // Evita NaN
                onChange={(e) => {
                  const valor = e.target.value ? Number(e.target.value) : null
                  setFormData((prev) => ({ ...prev, id: valor }))
                }}
              />
            </S.Row>
            <S.TitleSecundario>Dados do sinistro</S.TitleSecundario>
            <div>
              <S.Row>
                <S.TextLabel htmlFor="DataOcorrencia">
                  Data da Ocorrência
                </S.TextLabel>
                <input
                  type="date"
                  name="dataOcorrencia"
                  value={formData.dataOcorrencia || ''}
                  onChange={handleInputChange}
                />
              </S.Row>
              <S.Row>
                <S.TextLabel htmlFor="NF">Nota Fiscal</S.TextLabel>
                <input
                  type="number"
                  name="notaFiscal"
                  value={formData.notaFiscal || ''}
                  onChange={handleInputChange}
                />
              </S.Row>
              <S.Row>
                <S.TextLabel htmlFor="NomeCliente">Nome do cliente</S.TextLabel>
                <input
                  type="text"
                  name="nomeCliente"
                  value={formData.nomeCliente || ''}
                  onChange={handleInputChange}
                />
              </S.Row>
              <S.Row>
                <S.TextLabel htmlFor="Segmento">Segmento</S.TextLabel>
                <select
                  name="segmento"
                  id="segmento"
                  value={formData.segmento || ''}
                  onChange={handleInputChange}
                >
                  <option value="Eletronico">Eletrônico</option>
                  <option value="Farmaco">Farmaco</option>
                  <option value="Alimenticio">Alimentício</option>
                </select>
              </S.Row>
              <S.Row>
                <S.TextLabel htmlFor="Motivo">Motivo</S.TextLabel>
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
                  <option value="PercaTemperatura">Perca de temperatura</option>
                </select>
              </S.Row>
              <S.Row>
                <S.TextLabel htmlFor="ValorSinistro">
                  Valor do sinistro
                </S.TextLabel>
                <NumericFormat
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
            </div>
            <S.TitleSecundario>Responsabilidade</S.TitleSecundario>
            <div>
              <S.Row>
                <S.TextLabel htmlFor="Responsavel1">Responsável 1</S.TextLabel>
                <select
                  name="responsavel1"
                  value={formData.responsavel1 || ''}
                  onChange={handleInputChange}
                >
                  <option value="SeguroProprio">Seguro Próprio</option>
                  <option value="ImpactoIBL">Impacto IBL</option>
                  <option value="ImpactoLogic">Impacto Logic</option>
                  <option value="Parceiro/Agentes">Parceiro/Agentes</option>
                  <option value="SeguroCliente">Seguro Cliente</option>
                  <option value="Improcedente">Improcedente</option>
                  <option value="EmAndamento">Em andamento</option>
                </select>
              </S.Row>
              <S.Row>
                <S.TextLabel htmlFor="Responsavel2">Responsável 2</S.TextLabel>
                <input
                  type="text"
                  name="responsavel2"
                  value={formData.responsavel2 || ''}
                  onChange={handleInputChange}
                />
              </S.Row>
            </div>
            <S.TitleSecundario>Andamento</S.TitleSecundario>
            <div>
              <S.Row className="status">
                <S.TextLabel htmlFor="Status">Status</S.TextLabel>
                <textarea
                  name="status"
                  id="status"
                  value={formData.status || ''}
                  onChange={handleInputChange}
                ></textarea>
              </S.Row>
            </div>
            <S.TitleSecundario>Informações complementares</S.TitleSecundario>
            <div>
              <S.Row className="resumo">
                <S.TextLabel htmlFor="CiaAerea">Cia. aérea</S.TextLabel>
                <input
                  type="checkbox"
                  name="ciaAerea"
                  checked={formData.ciaAerea}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      ciaAerea: e.target.checked,
                      motorista: e.target.checked ? false : prev.motorista
                    }))
                  }
                />

                <S.TextLabel htmlFor="Motorista">Motorista</S.TextLabel>
                <input
                  type="checkbox"
                  name="motorista"
                  checked={formData.motorista}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      motorista: e.target.checked,
                      ciaAerea: e.target.checked ? false : prev.ciaAerea
                    }))
                  }
                />
              </S.Row>

              <div>
                {formData.ciaAerea && (
                  <>
                    <S.Row>
                      <S.TextLabel htmlFor="CiaArea">
                        Nome Cia. aérea
                      </S.TextLabel>
                      <input
                        type="text"
                        name="nomeCiaAerea"
                        value={formData.nomeCiaAerea || ''}
                        onChange={handleInputChange}
                      />
                    </S.Row>
                    <S.Row>
                      <S.TextLabel htmlFor="AWB">AWB</S.TextLabel>
                      <input
                        type="text"
                        name="awb"
                        value={formData.awb || ''}
                        onChange={handleInputChange}
                      />
                    </S.Row>
                  </>
                )}
                {formData.motorista && (
                  <>
                    <S.Row>
                      <S.TextLabel htmlFor="Motorista">Motorista</S.TextLabel>
                      <input
                        type="text"
                        name="nomeMotorista"
                        value={formData.nomeMotorista || ''}
                        onChange={handleInputChange}
                      />
                    </S.Row>
                    <S.Row>
                      <S.TextLabel htmlFor="cpf">CPF</S.TextLabel>
                      <InputMask
                        mask="999.999.999-99"
                        value={formData.cpf}
                        onChange={handleInputChange}
                      >
                        {(inputProps: any) => (
                          <input
                            {...inputProps}
                            type="text"
                            name="cpf"
                            id="cpf"
                          />
                        )}
                      </InputMask>
                    </S.Row>
                    <S.Row>
                      <S.TextLabel htmlFor="Placa">Placa</S.TextLabel>
                      <input
                        type="text"
                        name="placa"
                        value={formData.placa || ''}
                        onChange={handleInputChange}
                      />
                    </S.Row>
                    <S.Row>
                      <S.TextLabel htmlFor="Manifesto">Manifesto</S.TextLabel>
                      <input
                        type="number"
                        name="manifesto"
                        value={formData.manifesto || ''}
                        onChange={handleInputChange}
                      />
                    </S.Row>
                    <S.Row>
                      <S.TextLabel htmlFor="Local">Local</S.TextLabel>
                      <input
                        type="text"
                        name="local"
                        value={formData.local || ''}
                        onChange={handleInputChange}
                      />
                    </S.Row>
                  </>
                )}
              </div>
            </div>
            <S.TitleSecundario>Finalização</S.TitleSecundario>
            <div>
              <S.Row>
                <S.TextLabel htmlFor="EntregueFinanceiro">
                  Entregue no Financeiro?
                </S.TextLabel>
                <input
                  type="checkbox"
                  name="entregueFinanceiro"
                  checked={formData.entregueFinanceiro}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      entregueFinanceiro: e.target.checked
                    })
                  }
                />
              </S.Row>
              <S.Row>
                <S.TextLabel htmlFor="DataEntrega">Data da entrega</S.TextLabel>
                <input
                  type="date"
                  name="dataEntrega"
                  value={formData.dataEntrega || ''}
                  onChange={handleInputChange}
                />
              </S.Row>
            </div>{' '}
            <S.CampoButtons>
              <Botao
                type="button"
                title="Novo Sinistro"
                onClick={handleNewSinistro}
              >
                Adicionar novo sinistro
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

              <Botao type="submit" title="Salvar">
                Salvar
              </Botao>

              <Botao type="button" title="Imprimir" onClick={handlePrint}>
                Imprimir
              </Botao>

              <Botao
                type="button"
                title="Excluir sinistro"
                onClick={handleDelete}
                className="botaoFechar"
              >
                Excluir Sinistro
              </Botao>

              <Botao
                type="link"
                to={`/`}
                title="Fechar sinistro"
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

export default FormSinistro
