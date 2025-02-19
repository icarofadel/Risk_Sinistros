import styled from 'styled-components'
import { cores } from '../../styles'

export const HomeSection = styled.section`
  h2,
  h3 {
    color: ${cores.color};
    padding: 8px;
    display: flex;
    justify-content: center;
  }
`

export const ControlButtons = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const ContainerButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`

export const Column = styled.div`
  text-align: center;
`

export const ContainerRelatorio = styled.div`
  display: flex;
  gap: 10px;

  div {
    display: flex;
    align-items: center;
  }
`
