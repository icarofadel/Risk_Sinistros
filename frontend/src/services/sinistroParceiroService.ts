import axios from 'axios'

const API_URL = 'http://localhost:8081/sinistroParceiro'

export const cadastrarSinistro = async (formData: any) => {
  const response = await axios.post(API_URL, formData)
  return response.data
}

export const buscarSinistroPorNF = async (notaFiscal: string) => {
  try {
    const response = await axios.get(`${API_URL}/nf/${notaFiscal}`)
    return response.data
  } catch (error) {
    console.error('Erro na busca:', error)
    throw new Error('Sinistro não encontrado.')
  }
}

export const atualizarSinistro = async (id: number, dadosAtualizados: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, dadosAtualizados)
    return response.data
  } catch (error) {
    console.error('Erro ao atualizar sinistro:', error)
    throw error
  }
}

export const excluirSinistro = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`)
}
