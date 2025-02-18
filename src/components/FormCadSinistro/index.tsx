import { useState } from 'react'
import * as S from './styles'

const FormSinistro = () => {
  const [selected, setSelected] = useState<string | null>(null)

  const handleCheckboxChange = (value: string) => {
    if (selected === value) {
      setSelected(null)
    } else {
      setSelected(value)
    }
  }

  return (
    <form>
      <S.CampoForm>
        <div>
          <S.Title>Cadastro de Sinistro</S.Title>
          <S.Row>
            <S.TextLabel htmlFor="idSinistro">ID do Sinistro</S.TextLabel>
            <input type="number" />
          </S.Row>
          <S.TitleSecundario>Dados do sinistro</S.TitleSecundario>
          <div>
            <S.Row>
              <S.TextLabel htmlFor="DataOcorrencia">
                Data da Ocorrência
              </S.TextLabel>
              <input type="date" />
            </S.Row>
            <S.Row>
              <S.TextLabel htmlFor="NF">Nota Fiscal</S.TextLabel>
              <input type="number" />
            </S.Row>
            <S.Row>
              <S.TextLabel htmlFor="NomeCliente">Nome do cliente</S.TextLabel>
              <input type="text" />
            </S.Row>
            <S.Row>
              <S.TextLabel htmlFor="Segmento">Segmento</S.TextLabel>
              <select name="segmento" id="segmento">
                <option value="Eletronico">Eletrônico</option>
                <option value="Farmaco">Farmaco</option>
                <option value="Alimenticio">Alimentício</option>
              </select>
            </S.Row>
            <S.Row>
              <S.TextLabel htmlFor="Motivo">Motivo</S.TextLabel>
              <select name="Motivo" id="Motivo">
                <option value="Avaria">Avaria</option>
                <option value="Roubo">Roubo</option>
                <option value="Extravio/Falta">Extravio/Falta</option>
                <option value="Acidente">Acidente</option>
                <option value="ViolacaoLacre">Violação de lacre</option>
              </select>
            </S.Row>
            <S.Row>
              <S.TextLabel htmlFor="ValorSinistro">
                Valor do sinistro
              </S.TextLabel>
              <input type="" />
            </S.Row>
          </div>
          <S.TitleSecundario>Responsabilidade</S.TitleSecundario>
          <div>
            <S.Row>
              <S.TextLabel htmlFor="Responsavel1">Responsável 1</S.TextLabel>
              <select name="Responsavel1" id="Responsavel1">
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
              <input type="text" />
            </S.Row>
          </div>
          <S.TitleSecundario>Andamento</S.TitleSecundario>
          <div>
            <S.Row className="resumo">
              <S.TextLabel htmlFor="Status">Status</S.TextLabel>
              <textarea name="Resumo" id="Resumo"></textarea>
            </S.Row>
          </div>
          <S.TitleSecundario>Informações complementares</S.TitleSecundario>
          <div>
            <S.Row className="resumo">
              <S.TextLabel htmlFor="CiaAerea">Cia. aérea</S.TextLabel>
              <input
                type="checkbox"
                checked={selected === 'option1'}
                onChange={() => handleCheckboxChange('option1')}
              />
              <S.TextLabel htmlFor="Motorista">Motorista</S.TextLabel>
              <input
                type="checkbox"
                checked={selected === 'option2'}
                onChange={() => handleCheckboxChange('option2')}
              />
            </S.Row>

            <div>
              {selected === 'option1' && (
                <>
                  <S.Row>
                    <S.TextLabel htmlFor="CiaArea">Nome Cia. área</S.TextLabel>
                    <input type="text" />
                  </S.Row>
                  <S.Row>
                    <S.TextLabel htmlFor="CiaArea">AWB</S.TextLabel>
                    <input type="text" />
                  </S.Row>
                </>
              )}
              {selected === 'option2' && (
                <>
                  <S.Row>
                    <S.TextLabel htmlFor="Motorista">Motorista</S.TextLabel>
                    <input type="text" />
                  </S.Row>
                  <S.Row>
                    <S.TextLabel htmlFor="CPF">CPF</S.TextLabel>
                    <input type="text" />
                  </S.Row>
                  <S.Row>
                    <S.TextLabel htmlFor="Placa">Placa</S.TextLabel>
                    <input type="text" />
                  </S.Row>
                  <S.Row>
                    <S.TextLabel htmlFor="Manifesto">Manifesto</S.TextLabel>
                    <input type="number" />
                  </S.Row>
                  <S.Row>
                    <S.TextLabel htmlFor="Local">Local</S.TextLabel>
                    <input type="text" />
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
              <input type="checkbox" />
            </S.Row>
            <S.Row>
              <S.TextLabel htmlFor="DataEntrega">Data da entrega</S.TextLabel>
              <input type="date" />
            </S.Row>
          </div>
        </div>
      </S.CampoForm>
    </form>
  )
}

export default FormSinistro
