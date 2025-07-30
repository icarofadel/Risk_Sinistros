package br.com.icaro.SinistroParceiro.service;

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

import br.com.icaro.SinistroParceiro.domain.SinistroParceiro;
import br.com.icaro.SinistroParceiro.repository.ISinistroParceiroRepository;

@Service
public class SinistroParceiroService {

	@Autowired
	private ISinistroParceiroRepository sinistroParceiroRepository;
	
	public SinistroParceiro cadastrarSinistroParceiro(SinistroParceiro sinistroParceiro) {
		return sinistroParceiroRepository.save(sinistroParceiro);
	}
	
	public List<SinistroParceiro> listarTodos(){
		return sinistroParceiroRepository.findAll();
	}
	
	public Optional<SinistroParceiro> buscarPorId(Long id){
		return sinistroParceiroRepository.findById(id);
	}
	
	public Optional<SinistroParceiro> buscarPorNotaFiscal(String notaFiscal) {
		return sinistroParceiroRepository.findByNotaFiscal(notaFiscal);
	}
	
	public SinistroParceiro atualizarSinistroParceiro(Long id, SinistroParceiro novosDados) {
		return sinistroParceiroRepository.findById(id).map(sinistroParceiro -> {
			
			if (novosDados.getDataOcorrencia()!= null) sinistroParceiro.setDataOcorrencia(novosDados.getDataOcorrencia());
			if (novosDados.getNotaFiscal()!= null) sinistroParceiro.setNotaFiscal(novosDados.getNotaFiscal());
			if (novosDados.getNomeCliente()!= null) sinistroParceiro.setNomeCliente(novosDados.getNomeCliente());
			if (novosDados.getMotivo()!= null)sinistroParceiro.setMotivo(novosDados.getMotivo());
			if (novosDados.getValorSinistro()!= null) sinistroParceiro.setValorSinistro(novosDados.getValorSinistro());
			if (novosDados.getSacador()!= null) sinistroParceiro.setSacador(novosDados.getSacador());
			if (novosDados.getSacado()!= null) sinistroParceiro.setSacado(novosDados.getSacado());
			if (novosDados.getCnpjSacado() != null) sinistroParceiro.setCnpjSacado(novosDados.getCnpjSacado());
			if (novosDados.getEnvioControladoria()!= null) sinistroParceiro.setEnvioControladoria(novosDados.getEnvioControladoria());
			if (novosDados.getNFatura()!= null) sinistroParceiro.setNFatura(novosDados.getNFatura());		
			
			return sinistroParceiroRepository.save(sinistroParceiro);			
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sinistro não encontrado"));
    }

	public void excluirSinistroParceiro(Long id) {
        if (!sinistroParceiroRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sinistro não encontrado");
        }
        sinistroParceiroRepository.deleteById(id);  // Exclui o sinistro do banco
    }
	
	public byte[] exportarParaExcel() {
        List<SinistroParceiro> sinistrosParceiro = listarTodos();

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Sinistros");

            // Cabeçalhos
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("ID");
            header.createCell(1).setCellValue("Data Ocorrencia");
            header.createCell(2).setCellValue("Nota Fiscal");
            header.createCell(3).setCellValue("Nome Cliente");
            header.createCell(4).setCellValue("Motivo");
            header.createCell(5).setCellValue("Valor Sinistro");
            header.createCell(6).setCellValue("Sacador");
            header.createCell(7).setCellValue("Sacado");
            header.createCell(8).setCellValue("Cnpj Sacado");
            header.createCell(9).setCellValue("Envio Controladoria");
            header.createCell(10).setCellValue("N Fatura");

            // Dados
            int rowNum = 1;
            for (SinistroParceiro s : sinistrosParceiro) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(s.getId());
                row.createCell(1).setCellValue(s.getDataOcorrencia());
                row.createCell(2).setCellValue(s.getNotaFiscal());
                row.createCell(3).setCellValue(s.getNomeCliente());
                row.createCell(4).setCellValue(s.getMotivo());
                row.createCell(5).setCellValue(s.getValorSinistro());
                row.createCell(6).setCellValue(s.getSacador());
                row.createCell(7).setCellValue(s.getSacado());
                row.createCell(8).setCellValue(s.getCnpjSacado());
                row.createCell(9).setCellValue(s.getEnvioControladoria());
                row.createCell(10).setCellValue(s.getNFatura());
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
