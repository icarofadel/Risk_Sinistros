import axios from 'axios'

const API_URL = 'http://localhost:8080/sinistro'

// Função para buscar todos os sinistros
export const getSinistros = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Erro ao buscar sinistros:', error)
    throw error
  }
}

// Função para cadastrar um novo sinistro
export const createSinistro = async (sinistro: any) => {
  try {
    const response = await axios.post(API_URL, sinistro)
    return response.data
  } catch (error) {
    console.error('Erro ao cadastrar sinistro:', error)
    throw error
  }
}

// Função para deletar um sinistro
export const deleteSinistro = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`)
  } catch (error) {
    console.error('Erro ao deletar sinistro:', error)
    throw error
  }
}

// Função para buscar sinistro por ID
export const buscarSinistro = async (query: string | number) => {
  try {
    const response = await axios.get(`${API_URL}/${query}`) // Passa o id diretamente na URL
    return response.data
  } catch (error) {
    console.error('Erro ao buscar sinistro:', error)
    throw error
  }
}
