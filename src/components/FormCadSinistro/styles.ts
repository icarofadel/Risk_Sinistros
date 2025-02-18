import styled from 'styled-components'
import { cores } from '../../styles'

export const CampoForm = styled.div`
  color: #fff;
`

export const Title = styled.h3`
  color: ${cores.color};
  padding: 8px;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: center;
`
export const TitleSecundario = styled.span`
  color: ${cores.color};
  margin: 32px 0;
  font-weight: bold;
`

export const Row = styled.div`
  margin: 16px 0;

  &.resumo {
    display: flex;
    align-items: center;
  }
`

export const TextLabel = styled.label`
  margin: 0 8px 0;
`
export const CampoButtons = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: center;
`
