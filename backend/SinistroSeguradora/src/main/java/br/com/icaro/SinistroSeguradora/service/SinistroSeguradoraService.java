package br.com.icaro.SinistroSeguradora.service;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import br.com.icaro.SinistroSeguradora.domain.SinistroSeguradora;
import br.com.icaro.SinistroSeguradora.repository.ISinistroSeguradoraRepository;

@Service
public class SinistroSeguradoraService {

	@Autowired
	private ISinistroSeguradoraRepository sinistroSeguradoraRepository;
	
	public SinistroSeguradora cadastrarSinistro(SinistroSeguradora sinistroSeg) {
		return sinistroSeguradoraRepository.save(sinistroSeg);
	}
	
	public List<SinistroSeguradora> listarTodos() {
		return sinistroSeguradoraRepository.findAll();
	}
	
	public Optional<SinistroSeguradora> buscarPorId(Long id) {
		return sinistroSeguradoraRepository.findById(id);
	}
	
	public Optional<SinistroSeguradora> buscarPorNotaFiscal(String notaFiscal) {
		return sinistroSeguradoraRepository.findByNotaFiscal(notaFiscal);
	}
	
    public SinistroSeguradora atualizarSinistro(Long id, SinistroSeguradora novosDados) {
        return sinistroSeguradoraRepository.findById(id).map(sinistro -> {

            if (novosDados.getProcSeguradora() != null) sinistro.setProcSeguradora(novosDados.getProcSeguradora());
            if (novosDados.getSegurado() != null) sinistro.setSegurado(novosDados.getSegurado());
            if (novosDados.getNApolice() != null) sinistro.setNApolice(novosDados.getNApolice());
            if (novosDados.getNotaFiscal() != null) sinistro.setNotaFiscal(novosDados.getNotaFiscal());
            if (novosDados.getConhecimento() != null) sinistro.setConhecimento(novosDados.getConhecimento());
            if (novosDados.getNomeCliente() != null) sinistro.setNomeCliente(novosDados.getNomeCliente());
            if (novosDados.getTipoMercadoria() != null) sinistro.setTipoMercadoria(novosDados.getTipoMercadoria());
            if (novosDados.getValorEmbarcado() != null) sinistro.setValorEmbarcado(novosDados.getValorEmbarcado());
            if (novosDados.getValorNf() != null) sinistro.setValorNf(novosDados.getValorNf());
            if (novosDados.getEstimativaPrejuizo() != null) sinistro.setEstimativaPrejuizo(novosDados.getEstimativaPrejuizo());
            if (novosDados.getNatureza() != null) sinistro.setNatureza(novosDados.getNatureza());
            if (novosDados.getDataOcorrencia() != null) sinistro.setDataOcorrencia(novosDados.getDataOcorrencia());
            if (novosDados.getResumo() != null) sinistro.setResumo(novosDados.getResumo());
            if (novosDados.getPagador() != null) sinistro.setPagador(novosDados.getPagador());
            if (novosDados.getRemetente() != null) sinistro.setRemetente(novosDados.getRemetente());
            if (novosDados.getCidadeOrigem() != null) sinistro.setCidadeOrigem(novosDados.getCidadeOrigem());
            if (novosDados.getDestinatario() != null) sinistro.setDestinatario(novosDados.getDestinatario());
            if (novosDados.getCidadeDestino() != null) sinistro.setCidadeDestino(novosDados.getCidadeDestino());
            if (novosDados.getNomeCiaAerea() != null) sinistro.setNomeCiaAerea(novosDados.getNomeCiaAerea());
            if (novosDados.getAwb() != null) sinistro.setAwb(novosDados.getAwb());
            if (novosDados.getMotorista() !=null) sinistro.setMotorista(novosDados.getMotorista());
            if (novosDados.getCpf() != null) sinistro.setCpf(novosDados.getCpf());
            if (novosDados.getPlaca() != null) sinistro.setPlaca(novosDados.getPlaca());
            if (novosDados.getManifesto() != null) sinistro.setManifesto(novosDados.getManifesto());
            if (novosDados.getLocal() != null) sinistro.setLocal(novosDados.getLocal());
            if (novosDados.getStatus() != null) sinistro.setStatus(novosDados.getStatus());

            return sinistroSeguradoraRepository.save(sinistro);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sinistro não encontrado"));
    }
    
    public void excluirSinistro(Long id) {
    	if (!sinistroSeguradoraRepository.existsById(id)) {
    		throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sinistro não localizado");
    	}
    	sinistroSeguradoraRepository.deleteById(id);;
    }
    
    
    public byte[] exportarParaExcel() {
        List<SinistroSeguradora> sinistros = listarTodos();

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Sinistros");

            // Cabeçalhos
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("ID");
            header.createCell(0).setCellValue("Processo Seguradora");
            header.createCell(1).setCellValue("Segurado");
            header.createCell(2).setCellValue("Numero Apólice");
            header.createCell(3).setCellValue("Nota Fiscal");
            header.createCell(4).setCellValue("Conhecimento");
            header.createCell(5).setCellValue("Nome do cliente");
            header.createCell(6).setCellValue("Tipo de mercadoria");
            header.createCell(7).setCellValue("Valor Embarcado");
            header.createCell(8).setCellValue("Valor de NF");
            header.createCell(9).setCellValue("Estimativa de prejuizo");
            header.createCell(10).setCellValue("Natureza");
            header.createCell(11).setCellValue("Data da Ocorrência");
            header.createCell(12).setCellValue("Resumo");
            header.createCell(13).setCellValue("Pagador");
            header.createCell(14).setCellValue("Remetente");
            header.createCell(15).setCellValue("Cidade Origem");
            header.createCell(16).setCellValue("Destinatário");
            header.createCell(17).setCellValue("Cidade Destino");
            header.createCell(18).setCellValue("Nome Cia Aerea");
            header.createCell(19).setCellValue("AWB");
            header.createCell(20).setCellValue("Motorista");
            header.createCell(21).setCellValue("CPF");
            header.createCell(22).setCellValue("Placa");
            header.createCell(24).setCellValue("Local");
            header.createCell(25).setCellValue("Status");

            // Dados
            int rowNum = 1;
            for (SinistroSeguradora s : sinistros) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(s.getId());
                row.createCell(1).setCellValue(s.getProcSeguradora());
                row.createCell(2).setCellValue(s.getSegurado());
                row.createCell(3).setCellValue(s.getNApolice());
                row.createCell(4).setCellValue(s.getNotaFiscal());
                row.createCell(5).setCellValue(s.getConhecimento());
                row.createCell(6).setCellValue(s.getTipoMercadoria());
                row.createCell(7).setCellValue(s.getValorEmbarcado());
                row.createCell(8).setCellValue(s.getValorNf());
                row.createCell(9).setCellValue(s.getEstimativaPrejuizo());
                row.createCell(10).setCellValue(s.getNatureza());
                row.createCell(11).setCellValue(s.getDataOcorrencia());
                row.createCell(12).setCellValue(s.getResumo());
                row.createCell(13).setCellValue(s.getPagador());
                row.createCell(14).setCellValue(s.getRemetente());
                row.createCell(15).setCellValue(s.getCidadeOrigem());
                row.createCell(16).setCellValue(s.getDestinatario());
                row.createCell(17).setCellValue(s.getCidadeDestino());
                row.createCell(18).setCellValue(s.getNomeCiaAerea());
                row.createCell(19).setCellValue(s.getAwb());
                row.createCell(20).setCellValue(s.getMotorista());
                row.createCell(21).setCellValue(s.getCpf());
                row.createCell(22).setCellValue(s.getPlaca());
                row.createCell(24).setCellValue(s.getLocal());
                row.createCell(25).setCellValue(s.getStatus());
            }

            // Ajustar tamanho automático das colunas
            for (int i = 0; i < header.getLastCellNum(); i++) {
                sheet.autoSizeColumn(i);
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            return out.toByteArray();

        } catch (IOException e) {
            throw new RuntimeException("Erro ao gerar Excel", e);
        }
    }
	
}
