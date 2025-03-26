import styled from 'styled-components'

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ModalContent = styled.div`
  background: #3c3c3c;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px; /* Espaço entre os elementos */
`

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
