import axios from 'axios'

const API_URL = 'http://localhost:8081/sinistroParceiro'

export const cadastrarSinistro = async (formData: any) => {
  const response = await axios.post(API_URL, formData)
  return response.data
}

export const buscarSinistroParceiroPorNF = async (notaFiscal: string) => {
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

export const baixarCartaSinistro = async (id: number): Promise<Blob> => {
  const response = await axios.get(`${API_URL}/Nc-Parceiro/${id}`, {
    responseType: 'blob'
  })

  return response.data
}

export const exportarSinistrosExcelParceiro = async () => {
  try {
    const response = await axios.get(`${API_URL}/exportar`, {
      responseType: 'blob' // importante para receber arquivos binários
    })

    // Cria um link para download do arquivo
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'sinistrosParceiro.xlsx') // nome do arquivo
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    console.error('Erro ao exportar sinistros:', error)
    throw error
  }
}
