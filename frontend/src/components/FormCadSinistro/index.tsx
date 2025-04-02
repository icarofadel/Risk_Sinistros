import { useState } from 'react'
import * as S from './styles'
import Botao from '../Button'
import BuscarSinistroModal from '../BuscarSinistroModal'
import axios from 'axios'
import {
  cadastrarSinistro,
  excluirSinistro
} from '../../services/sinistroService'

const FormSinistro = () => {
  const [selected, setSelected] = useState<string | null>(null)
  const [modalAberto, setModalAberto] = useState(false)

  // Dados do formulário
  const [formData, setFormData] = useState({
    idSinistro: '',
    dataOcorrencia: '',
    notaFiscal: '',
    nomeCliente: '',
    segmento: '',
    motivo: '',
    valorSinistro: '',
    responsavel1: '',
    responsavel2: '',
    status: '',
    resumo: '',
    ciaAerea: '',
    motorista: '',
    entregueFinanceiro: false,
    dataEntrega: '',
    awb: '',
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
      [name]: name === 'idSinistro' ? (value ? Number(value) : '') : value // Converte idSinistro para número
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await cadastrarSinistro(formData) // Usa a função do service
      console.log('Sinistro cadastrado com sucesso!')
      handleNewSinistro()
    } catch (error) {
      console.error('Erro ao cadastrar sinistro', error)
    }
  }

  const handleDelete = async () => {
    if (!formData.idSinistro) {
      alert('Informe o ID do sinistro para excluir.')
      return
    }
    try {
      await excluirSinistro(Number(formData.idSinistro)) // Usa a função do service
      console.log('Sinistro excluído com sucesso')
      handleNewSinistro()
    } catch (error) {
      console.error('Erro ao excluir sinistro', error)
    }
  }

  const handlePrint = () => {
    window.print()
  }
  const handleNewSinistro = () => {
    setFormData({
      idSinistro: '',
      dataOcorrencia: '',
      notaFiscal: '',
      nomeCliente: '',
      segmento: '',
      motivo: '',
      valorSinistro: '',
      responsavel1: '',
      responsavel2: '',
      status: '',
      resumo: '',
      ciaAerea: '',
      motorista: '',
      entregueFinanceiro: false,
      dataEntrega: '',
      awb: '',
      cpf: '',
      placa: '',
      manifesto: '',
      local: ''
    })
  }

  const preencherFormulario = (dados: any) => {
    setFormData({
      idSinistro: dados.idSinistro,
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
      awb: dados.awb,
      cpf: dados.cpf,
      placa: dados.placa,
      manifesto: dados.manifesto,
      local: dados.local
    })
  }

  return (
    <div>
      {modalAberto && (
        <BuscarSinistroModal
          fechar={() => setModalAberto(false)}
          preencherFormulario={preencherFormulario}
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
                name="idSinistro"
                value={formData.idSinistro || ''}
                onChange={handleInputChange}
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
                <input
                  type="number"
                  name="valorSinistro"
                  value={formData.valorSinistro || ''}
                  onChange={handleInputChange}
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
              <S.Row className="resumo">
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
                  checked={formData.ciaAerea === 'option1'}
                  onChange={() => handleCheckboxChange('option1')}
                />
                <S.TextLabel htmlFor="Motorista">Motorista</S.TextLabel>
                <input
                  type="checkbox"
                  name="motorista"
                  checked={formData.motorista === 'option2'}
                  onChange={() => handleCheckboxChange('option2')}
                />
              </S.Row>

              <div>
                {selected === 'option1' && (
                  <>
                    <S.Row>
                      <S.TextLabel htmlFor="CiaArea">
                        Nome Cia. área
                      </S.TextLabel>
                      <input
                        type="text"
                        name="ciaArea"
                        value={formData.ciaAerea || ''}
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
                {selected === 'option2' && (
                  <>
                    <S.Row>
                      <S.TextLabel htmlFor="Motorista">Motorista</S.TextLabel>
                      <input
                        type="text"
                        name="motorista"
                        value={formData.motorista || ''}
                        onChange={handleInputChange}
                      />
                    </S.Row>
                    <S.Row>
                      <S.TextLabel htmlFor="CPF">CPF</S.TextLabel>
                      <input
                        type="text"
                        name="cpf"
                        value={formData.cpf || ''}
                        onChange={handleInputChange}
                      />
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
              <Botao type="link" to={`/`} title="Fechar sinistro">
                Fechar sinistro
              </Botao>
              <Botao
                type="button"
                title="Excluir sinistro"
                onClick={handleDelete}
              >
                Excluir Sinistro
              </Botao>
              <Botao type="submit" title="Salvar">
                Salvar
              </Botao>
              <Botao
                type="button"
                title="Buscar Sinistro"
                onClick={() => setModalAberto(true)}
              >
                Buscar Sinistro
              </Botao>
              <Botao type="button" title="Imprimir" onClick={handlePrint}>
                Imprimir
              </Botao>
              <Botao
                type="button"
                title="Novo Sinistro"
                onClick={handleNewSinistro}
              >
                Novo Sinistro
              </Botao>
            </S.CampoButtons>
          </div>
        </S.CampoForm>
      </form>
    </div>
  )
}

export default FormSinistro
