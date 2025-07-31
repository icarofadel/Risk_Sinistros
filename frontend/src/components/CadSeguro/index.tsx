// Pacotes externos
import { useState } from 'react'
import { NumericFormat } from 'react-number-format'
import InputMask from 'react-input-mask'

// Estilos
import * as S from '../../styles'

// Componentes
import Botao from '../Button'
import { BuscarSinistroModal } from '../BuscarSinistroModal'

// Serviços
import {
  atualizarSinistro,
  buscarSinistroSeguradoraPorNF,
  cadastrarSinistro,
  excluirSinistro
} from '../../services/sinistroSeguradoraService'

const Seguro = () => {
  const segurado = [
    {
      id: 1,
      nome: 'Intermodal Brasil Logística LTDA - CNPJ 03.558.055/0001-00'
    },
    {
      id: 2,
      nome: 'Logic Pharma Armazéns Gerais LTDA - CNPJ 21.372.384/0001-43'
    },
    { id: 3, nome: 'IBL Transporte de Valores LTDA - CNPJ 26.729.300/0001-08' }
  ]

  const nApolices: { [key: number]: string[] } = {
    1: [
      'RCTA-C - 5201000243 - 2022 x 2024',
      'RCTR-C - 5400039845 - 2022 x 2024',
      'RCF-DC - 5501008924 - 2022 x 2024',
      'RCTR-C - 5400041593 - 2024 x 2026',
      'RCF-DC - 5501010272 - 2024 x 2026',
      'RCTA-C - 5201000301 - 2024 x 2026'
    ],
    2: [
      'RCTA-C - 5201000245 - 2022 x 2024',
      'RCTR-C - 5400039845 - 2022 x 2024',
      'RCF-DC - 5501008929 - 2022 x 2024',
      'RCTR-C - 5400041595 - 2024 x 2026',
      'RCF-DC - 5501010273 - 2024 x 2026',
      'RCTA-C - 5201000302 - 2024 x 2026'
    ],
    3: [
      'RCTA-C - 5201000244 - 2022 x 2024',
      'RCTR-C - 5400039849 - 2022 x 2024',
      'RCF-DC - 5501008928 - 2022 x 2024',
      'RCTR-C - 5400041591 - 2024 x 2026',
      'RCF-DC - 5501010271 - 2024 x 2026',
      'RCTA-C - 5201000300 - 2024 x 2026'
    ]
  }

  const [formData, setFormData] = useState<any>({
    procSeguradora: '',
    segurado: '',
    nApolice: '',
    notaFiscal: '',
    conhecimento: '',
    nomeCliente: '',
    tipoMercadoria: '',
    valorEmbarcado: null as number | null,
    valorNf: null as number | null,
    estimativaPrejuizo: null as number | null,
    natureza: '',
    dataOcorrencia: '',
    resumo: '',
    pagador: '',
    remetente: '',
    cidadeOrigem: '',
    destinatario: '',
    cidadeDestino: '',
    ciaAerea: false,
    motorista: false,
    nomeCiaAerea: '',
    awb: '',
    nomeMotorista: '',
    cpf: '',
    placa: '',
    manifesto: '',
    local: '',
    status: ''
  })

  const prepararDadosParaEnvio = (data: any) => {
    const seguradoSelecionado = segurado.find(
      (s) => s.id === Number(data.segurado)
    )

    return {
      ...data,
      segurado: seguradoSelecionado?.nome || '',
      cpf: data.cpf ? Number(data.cpf.replace(/\D/g, '')) : null,
      manifesto: data.manifesto ? Number(data.manifesto) : null,
      valorEmbarcado: data.valorEmbarcado ? Number(data.valorEmbarcado) : null,
      valorNf: data.valorNf ? Number(data.valorNf) : null,
      estimativaPrejuizo: data.estimativaPrejuizo
        ? Number(data.estimativaPrejuizo)
        : null,
      dataOcorrencia: data.dataOcorrencia || null
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target
    const isCheckbox = (target: EventTarget): target is HTMLInputElement =>
      (target as HTMLInputElement).type === 'checkbox'

    setFormData((prev: any) => ({
      ...prev,
      [name]: isCheckbox(e.target)
        ? (e.target as HTMLInputElement).checked
        : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const dadosTratados = prepararDadosParaEnvio(formData)
      console.log('Dados tratados para envio:', dadosTratados) // <-- aqui!
      await cadastrarSinistro(dadosTratados)
      alert('Sinistro cadastrado com sucesso!')
      handleNewSinistro()
    } catch (error) {
      alert('Erro ao cadastrar sinistro')
    }
  }

  const [selectedSegurado, setSelectedSegurado] = useState<number | string>('')
  const [filterednApolices, setFilterednApolices] = useState<string[]>([])

  const handleSeguradoChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const segurado = Number(event.target.value)
    setSelectedSegurado(segurado)
    setFilterednApolices(nApolices[segurado] || [])
    setFormData((prev: any) => ({
      ...prev,
      segurado
    }))
  }

  const [selected, setSelected] = useState<string | null>(null)

  const handleCheckboxChange = (value: string) => {
    if (selected === value) {
      setSelected(null)
      setFormData((prev: any) => ({
        ...prev,
        ciaAerea: false,
        motorista: false
      }))
    } else {
      setSelected(value)
      setFormData((prev: any) => ({
        ...prev,
        ciaAerea: value === 'option1',
        motorista: value === 'option2'
      }))
    }
  }

  const [modalAberto, setModalAberto] = useState(false)

  const preencherFormulario = (dados: any): void => {
    setFormData(dados)
  }

  const handleAtualizarSinistro = async () => {
    try {
      const id = formData.id
      const dados = prepararDadosParaEnvio(formData)
      await atualizarSinistro(id, dados)
      alert('Sinistro atualizado com sucesso!')
    } catch (error) {
      console.error(error)
      alert('Erro ao atualizar sinistro.')
    }
  }

  const handleExcluirSinistro = async () => {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este sinistro?'
    )
    if (!confirmar) return

    try {
      const id = formData.id
      await excluirSinistro(id)
      alert('Sinistro excluído com sucesso!')
      setFormData({})
    } catch (error) {
      console.error(error)
      alert('Erro ao excluir sinistro.')
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleNewSinistro = () => {
    setFormData({
      procSeguradora: '',
      segurado: '',
      nApolice: '',
      notaFiscal: '',
      conhecimento: '',
      nomeCliente: '',
      tipoMercadoria: '',
      valorEmbarcado: '',
      valorNf: '',
      estimativaPrejuizo: '',
      natureza: '',
      dataOcorrencia: '',
      resumo: '',
      pagador: '',
      remetente: '',
      cidadeOrigem: '',
      destinatario: '',
      cidadeDestino: '',
      ciaAerea: false,
      motorista: false,
      nomeCiaAerea: '',
      awb: '',
      nomeMotorista: '',
      cpf: '',
      placa: '',
      manifesto: '',
      local: '',
      status: ''
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <S.CampoForm>
        <div>
          <S.Title>Cadastro sinistro no seguro</S.Title>
          <S.Row>
            <S.TextLabel htmlFor="procSeguradora">
              Nº Processo seguradora
            </S.TextLabel>
            <input
              type="text"
              name="procSeguradora"
              value={formData.procSeguradora}
              onChange={handleInputChange}
            />
          </S.Row>
          <S.TitleSecundario>Dados do Segurado</S.TitleSecundario>
          <S.Row>
            <S.TextLabel htmlFor="segurado">Segurado</S.TextLabel>
            <select
              id="segurado"
              name="segurado"
              value={formData.segurado}
              onChange={handleSeguradoChange}
            >
              <option value="">Selecione um segurado</option>
              {segurado.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nome}
                </option>
              ))}
            </select>
          </S.Row>
          <S.Row>
            <S.TextLabel htmlFor="nApolice">Número da Apólice</S.TextLabel>
            <select
              id="nApolice"
              name="nApolice"
              value={formData.nApolice}
              onChange={handleInputChange}
            >
              <option value="">Selecione a apólice</option>
              {filterednApolices.map((nApolice, index) => (
                <option key={index} value={nApolice}>
                  {nApolice}
                </option>
              ))}
            </select>
          </S.Row>
          <S.TitleSecundario>Dados do sinistro</S.TitleSecundario>
          <S.Row>
            <S.TextLabel htmlFor="notaFiscal">Nota Fiscal</S.TextLabel>
            <input
              type="number"
              name="notaFiscal"
              value={formData.notaFiscal}
              onChange={handleInputChange}
            />
          </S.Row>
          <S.Row>
            <S.TextLabel htmlFor="conhecimento">conhecimento</S.TextLabel>
            <input
              type="text"
              name="conhecimento"
              value={formData.conhecimento}
              onChange={handleInputChange}
            />
          </S.Row>
          <S.Row>
            <S.TextLabel htmlFor="nomeCliente">Nome do cliente</S.TextLabel>
            <input
              type="text"
              name="nomeCliente"
              value={formData.nomeCliente}
              onChange={handleInputChange}
            />
          </S.Row>
          <S.Row>
            <S.TextLabel htmlFor="tipoMercadoria">
              Tipo de Mercadoria
            </S.TextLabel>
            <input
              type="text"
              name="tipoMercadoria"
              value={formData.tipoMercadoria}
              onChange={handleInputChange}
            />
          </S.Row>
          <S.Row>
            <S.TextLabel htmlFor="valorEmbarcado">Valor Embarcado</S.TextLabel>
            <NumericFormat
              name="valorEmbarcado"
              value={formData.valorEmbarcado}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
              onValueChange={(values) => {
                const { floatValue } = values
                setFormData((prev: any) => ({
                  ...prev,
                  valorEmbarcado: floatValue ?? null
                }))
              }}
              placeholder="R$ 0,00"
            />
          </S.Row>
          <S.Row>
            <S.TextLabel htmlFor="valorNf">Valor NF</S.TextLabel>
            <NumericFormat
              name="valorNf"
              value={formData.valorNf}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
              onValueChange={(values) => {
                const { floatValue } = values
                setFormData((prev: any) => ({
                  ...prev,
                  valorNf: floatValue ?? null
                }))
              }}
              placeholder="R$ 0,00"
            />
          </S.Row>
          <S.Row>
            <S.TextLabel htmlFor="estimativaPrejuizo">
              Estimativa do Prejuízo
            </S.TextLabel>
            <NumericFormat
              name="estimativaPrejuizo"
              value={formData.estimativaPrejuizo}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
              onValueChange={(values) => {
                const { floatValue } = values
                setFormData((prev: any) => ({
                  ...prev,
                  estimativaPrejuizo: floatValue ?? null
                }))
              }}
              placeholder="R$ 0,00"
            />
          </S.Row>
          <S.Row>
            <S.TextLabel htmlFor="natureza">Natureza</S.TextLabel>
            <input
              type="text"
              name="natureza"
              value={formData.natureza}
              onChange={handleInputChange}
            />
          </S.Row>
          <S.Row>
            <S.TextLabel htmlFor="dataOcorrencia">
              Data da ocorrência
            </S.TextLabel>
            <input
              type="date"
              name="dataOcorrencia"
              value={formData.dataOcorrencia}
              onChange={handleInputChange}
            />
          </S.Row>
          <S.Row className="resumo">
            <S.TextLabel htmlFor="resumo">resumo</S.TextLabel>
            <textarea
              name="resumo"
              value={formData.resumo}
              onChange={handleInputChange}
            ></textarea>
          </S.Row>

          <S.TitleSecundario>Dados da entrega</S.TitleSecundario>
          <S.Row>
            <S.TextLabel htmlFor="pagador">Pagador</S.TextLabel>
            <input
              type="text"
              name="pagador"
              value={formData.pagador}
              onChange={handleInputChange}
            />
          </S.Row>
          <S.Row>
            <S.TextLabel htmlFor="remetente">Remetente</S.TextLabel>
            <input
              type="text"
              name="remetente"
              value={formData.remetente}
              onChange={handleInputChange}
            />
          </S.Row>
          <S.Row>
            <S.TextLabel htmlFor="cidadeOrigem">Cidade Origem</S.TextLabel>
            <input
              type="text"
              name="cidadeOrigem"
              value={formData.cidadeOrigem}
              onChange={handleInputChange}
            />
          </S.Row>
          <S.Row>
            <S.TextLabel htmlFor="destinatario">Destinatário</S.TextLabel>
            <input
              type="text"
              name="destinatario"
              value={formData.destinatario}
              onChange={handleInputChange}
            />
          </S.Row>
          <S.Row>
            <S.TextLabel htmlFor="cidadeDestino">Cidade Destino</S.TextLabel>
            <input
              type="text"
              name="cidadeDestino"
              value={formData.cidadeDestino}
              onChange={handleInputChange}
            />
          </S.Row>

          <S.TitleSecundario>Informações complementares</S.TitleSecundario>
          <S.Row className="resumo">
            <S.TextLabel htmlFor="ciaAerea">Cia. aérea</S.TextLabel>
            <input
              type="checkbox"
              checked={selected === 'option1'}
              onChange={() => handleCheckboxChange('option1')}
            />
            <S.TextLabel htmlFor="motorista">Motorista</S.TextLabel>
            <input
              type="checkbox"
              checked={selected === 'option2'}
              onChange={() => handleCheckboxChange('option2')}
            />
          </S.Row>

          {selected === 'option1' && (
            <>
              <S.Row>
                <S.TextLabel htmlFor="nomeCiaAerea">
                  Nome Cia. aérea
                </S.TextLabel>
                <input
                  type="text"
                  name="nomeCiaAerea"
                  value={formData.nomeCiaAerea}
                  onChange={handleInputChange}
                />
              </S.Row>
              <S.Row>
                <S.TextLabel htmlFor="awb">AWB</S.TextLabel>
                <input
                  type="text"
                  name="awb"
                  value={formData.awb}
                  onChange={handleInputChange}
                />
              </S.Row>
            </>
          )}
          {selected === 'option2' && (
            <>
              <S.Row>
                <S.TextLabel htmlFor="nomeMotorista">Motorista</S.TextLabel>
                <input
                  type="text"
                  name="nomeMotorista"
                  value={formData.nomeMotorista}
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
                    <input {...inputProps} type="text" name="cpf" id="cpf" />
                  )}
                </InputMask>
              </S.Row>
              <S.Row>
                <S.TextLabel htmlFor="placa">Placa</S.TextLabel>
                <input
                  type="text"
                  name="placa"
                  value={formData.placa}
                  onChange={handleInputChange}
                />
              </S.Row>
              <S.Row>
                <S.TextLabel htmlFor="manifesto">Manifesto</S.TextLabel>
                <input
                  type="number"
                  name="manifesto"
                  value={formData.manifesto}
                  onChange={handleInputChange}
                />
              </S.Row>
              <S.Row>
                <S.TextLabel htmlFor="local">Local</S.TextLabel>
                <input
                  type="text"
                  name="local"
                  value={formData.local}
                  onChange={handleInputChange}
                />
              </S.Row>
            </>
          )}

          <S.TitleSecundario>Finalização</S.TitleSecundario>
          <S.Row>
            <S.TextLabel htmlFor="status">Status</S.TextLabel>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="">Selecione o status</option>
              <option value="Acionado">Acionado</option>
              <option value="Analise">Em análise</option>
              <option value="Pendente de documentos">
                Pendente de documentos
              </option>
              <option value="Vistoria">Vistoria</option>
              <option value="AssinaturaTed">Ag. assinatura TED</option>
              <option value="AguardandoIndenizacao">Ag. indenização</option>
              <option value="Indenizado">Indenizado</option>
            </select>
          </S.Row>

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
              onClick={handleExcluirSinistro}
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

          {modalAberto && (
            <BuscarSinistroModal
              fechar={() => setModalAberto(false)}
              preencherFormulario={preencherFormulario}
              service={buscarSinistroSeguradoraPorNF}
            />
          )}
        </div>
      </S.CampoForm>
    </form>
  )
}

export default Seguro
