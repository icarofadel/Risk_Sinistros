import { useState } from 'react'

import {
  CampoButtons,
  CampoForm,
  Row,
  TextLabel,
  Title,
  TitleSecundario
} from '../FormCadSinistro/styles'
import Botao from '../Button'
import { BuscarSinistroModal } from '../BuscarSinistroModal'
import { buscarSinistroPorNF } from '../../services/sinistroService'

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

  const apolices: { [key: number]: string[] } = {
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

  const [selectedSegurado, setSelectedSegurado] = useState<number | string>('')
  const [filteredApolices, setFilteredApolices] = useState<string[]>([])

  const handleSeguradoChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const seguradoId = Number(event.target.value)
    setSelectedSegurado(seguradoId)

    setFilteredApolices(apolices[seguradoId] || [])
  }

  const [selected, setSelected] = useState<string | null>(null)

  const handleCheckboxChange = (value: string) => {
    if (selected === value) {
      setSelected(null)
    } else {
      setSelected(value)
    }
  }

  const [modalAberto, setModalAberto] = useState(false)

  function preencherFormulario(dados: any): void {
    throw new Error('Function not implemented.')
  }

  return (
    <form>
      <CampoForm>
        <div>
          <Title>Cadastro sinistro no seguro</Title>
          <Row>
            <TextLabel htmlFor="NcParceiro">Nº Processo seguradora</TextLabel>
            <input type="number" />
          </Row>
          <TitleSecundario>Dados do Segurado</TitleSecundario>
          <Row>
            <TextLabel htmlFor="segurado">Segurado</TextLabel>
            <select
              id="segurado"
              value={selectedSegurado}
              onChange={handleSeguradoChange}
            >
              <option value="">Selecione um segurado</option>
              {segurado.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nome}
                </option>
              ))}
            </select>
          </Row>
          <Row>
            <TextLabel htmlFor="Apolice">Número da Apólice</TextLabel>
            <select id="Apolice">
              <option value="">Selecione a apólice</option>
              {filteredApolices.map((apolice, index) => (
                <option key={index} value={apolice}>
                  {apolice}
                </option>
              ))}
            </select>
          </Row>
          <TitleSecundario>Dados do sinistro</TitleSecundario>
          <div>
            <Row>
              <TextLabel htmlFor="NF">Nota Fiscal</TextLabel>
              <input type="number" />
            </Row>
            <Row>
              <TextLabel htmlFor="Conhecimento">Conhecimento</TextLabel>
              <input type="text" />
            </Row>
            <Row>
              <TextLabel htmlFor="NomeCliente">Nome do cliente</TextLabel>
              <input type="text" />
            </Row>
            <Row>
              <TextLabel htmlFor="TipoMercadoria">Tipo de Mercadoria</TextLabel>
              <input type="text" />
            </Row>
            <Row>
              <TextLabel htmlFor="ValorEmbarcado">Valor Embarcado</TextLabel>
              <input type="text" />
            </Row>
            <Row>
              <TextLabel htmlFor="ValorNF">Valor NF</TextLabel>
              <input type="text" />
            </Row>
            <Row>
              <TextLabel htmlFor="EstimativaPrejuizo">
                Estimativa do Prejuizo
              </TextLabel>
              <input type="text" />
            </Row>
            <Row>
              <TextLabel htmlFor="Natureza">Natureza</TextLabel>
              <input type="text" />
            </Row>
            <Row>
              <TextLabel htmlFor="DataOcorrencia">Data da ocorrência</TextLabel>
              <input type="date" />
            </Row>
            <div>
              <Row className="resumo">
                <TextLabel htmlFor="Resumo">Resumo</TextLabel>
                <textarea name="Resumo" id="Resumo"></textarea>
              </Row>
            </div>

            <TitleSecundario>Dados da entrega</TitleSecundario>
            <Row>
              <TextLabel htmlFor="Pagador">Pagador</TextLabel>
              <input type="text" />
            </Row>
            <Row>
              <TextLabel htmlFor="Remetente">Remetente</TextLabel>
              <input type="text" />
            </Row>
            <Row>
              <TextLabel htmlFor="CidadeOrigem">Cidade Origem</TextLabel>
              <input type="text" />
            </Row>
            <Row>
              <TextLabel htmlFor="Destinatario">Destinatário</TextLabel>
              <input type="text" />
            </Row>
            <Row>
              <TextLabel htmlFor="CidadeDestino">Cidade Destino</TextLabel>
              <input type="text" />
            </Row>
          </div>

          <TitleSecundario>Informações complementares</TitleSecundario>
          <div>
            <Row className="resumo">
              <TextLabel htmlFor="CiaAerea">Cia. aérea</TextLabel>
              <input
                type="checkbox"
                checked={selected === 'option1'}
                onChange={() => handleCheckboxChange('option1')}
              />
              <TextLabel htmlFor="Motorista">Motorista</TextLabel>
              <input
                type="checkbox"
                checked={selected === 'option2'}
                onChange={() => handleCheckboxChange('option2')}
              />
            </Row>

            <div>
              {selected === 'option1' && (
                <>
                  <Row>
                    <TextLabel htmlFor="CiaArea">Nome Cia. área</TextLabel>
                    <input type="text" />
                  </Row>
                  <Row>
                    <TextLabel htmlFor="CiaArea">AWB</TextLabel>
                    <input type="text" />
                  </Row>
                </>
              )}
              {selected === 'option2' && (
                <>
                  <Row>
                    <TextLabel htmlFor="Motorista">Motorista</TextLabel>
                    <input type="text" />
                  </Row>
                  <Row>
                    <TextLabel htmlFor="CPF">CPF</TextLabel>
                    <input type="text" />
                  </Row>
                  <Row>
                    <TextLabel htmlFor="Placa">Placa</TextLabel>
                    <input type="text" />
                  </Row>
                  <Row>
                    <TextLabel htmlFor="Manifesto">Manifesto</TextLabel>
                    <input type="number" />
                  </Row>
                  <Row>
                    <TextLabel htmlFor="Local">Local</TextLabel>
                    <input type="text" />
                  </Row>
                </>
              )}
            </div>
          </div>

          <TitleSecundario>Finalização</TitleSecundario>
          <div>
            <Row>
              <TextLabel htmlFor="status">Status</TextLabel>
              <select name="Status" id="Status">
                <option value="SelecioneStatus">Selecione o status</option>
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
            <Botao
              type="button"
              title="Buscar Sinistro"
              onClick={() => setModalAberto(true)}
            >
              Buscar Sinistro
            </Botao>
          </CampoButtons>
          {modalAberto && (
            <BuscarSinistroModal
              fechar={() => setModalAberto(false)}
              preencherFormulario={preencherFormulario}
              service={buscarSinistroPorNF} // <-- injeta a função do seu service parceiro
            />
          )}
        </div>
      </CampoForm>
    </form>
  )
}

export default Seguro
