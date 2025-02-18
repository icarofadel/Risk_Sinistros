import styled from 'styled-components'
import { cores } from '../../styles'

export const HomeSection = styled.section`
  h2 {
    color: ${cores.color};
    padding: 8px;
    display: flex;
    justify-content: center;
  }
`

export const ControlButtons = styled.div`
  margin-top: 8px;
  display: grid;
  justify-items: start;
`
