package br.com.icaro.Sinistro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import br.com.icaro.Sinistro.domain.Sinistro;
import br.com.icaro.Sinistro.repository.ISinistroRepository;

@Service
public class SinistroService {

    @Autowired
    private ISinistroRepository sinistroRepository;
    
    public Sinistro cadastrarSinistro(Sinistro sinistro) {
        return sinistroRepository.save(sinistro);
    }
    
    public List<Sinistro> listarTodos() {
        return sinistroRepository.findAll();
    }
    
    public Optional<Sinistro> buscarPorId(Long id) {
        return sinistroRepository.findById(id);
    }
    
    public Optional<Sinistro> buscarPorNotaFiscal(String notaFiscal) {
        return sinistroRepository.findByNotaFiscal(notaFiscal);
    }
    
    public Sinistro atualizarSinistro(Long id, Sinistro novosDados) {
        return sinistroRepository.findById(id).map(sinistro -> {

            if (novosDados.getDataOcorrencia() != null) sinistro.setDataOcorrencia(novosDados.getDataOcorrencia());
            if (novosDados.getNotaFiscal() != null) sinistro.setNotaFiscal(novosDados.getNotaFiscal());
            if (novosDados.getNomeCliente() != null) sinistro.setNomeCliente(novosDados.getNomeCliente());
            if (novosDados.getSegmento() != null) sinistro.setSegmento(novosDados.getSegmento());
            if (novosDados.getMotivo() != null) sinistro.setMotivo(novosDados.getMotivo());
            if (novosDados.getValorSinistro() != null) sinistro.setValorSinistro(novosDados.getValorSinistro());
            if (novosDados.getResponsavel1() != null) sinistro.setResponsavel1(novosDados.getResponsavel1());
            if (novosDados.getResponsavel2() != null) sinistro.setResponsavel2(novosDados.getResponsavel2());
            if (novosDados.getStatus() != null) sinistro.setStatus(novosDados.getStatus());
            if (novosDados.getCiaAerea() != null) sinistro.setCiaAerea(novosDados.getCiaAerea());
            if (novosDados.getMotorista() != null) sinistro.setMotorista(novosDados.getMotorista());
            if (novosDados.getNomeCiaAerea() != null) sinistro.setNomeCiaAerea(novosDados.getNomeCiaAerea());
            if (novosDados.getAwb() != null) sinistro.setAwb(novosDados.getAwb());
            if (novosDados.getNomeMotorista() != null) sinistro.setNomeMotorista(novosDados.getNomeMotorista());
            if (novosDados.getCpfMotorista() != null) sinistro.setCpfMotorista(novosDados.getCpfMotorista());
            if (novosDados.getPlacaVeiculo() != null) sinistro.setPlacaVeiculo(novosDados.getPlacaVeiculo());
            if (novosDados.getManifesto() != null) sinistro.setManifesto(novosDados.getManifesto());
            if (novosDados.getLocal() != null) sinistro.setLocal(novosDados.getLocal());

            return sinistroRepository.save(sinistro);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sinistro não encontrado"));
    }


    
    public void excluirSinistro(Long id) {
        if (!sinistroRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sinistro não encontrado");
        }
        sinistroRepository.deleteById(id);  // Exclui o sinistro do banco
    }
    
    public byte[] exportarParaExcel() {
        List<Sinistro> sinistros = listarTodos();

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Sinistros");

            // Cabeçalhos
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("ID");
            header.createCell(1).setCellValue("Data Ocorrência");
            header.createCell(2).setCellValue("Nota Fiscal");
            header.createCell(3).setCellValue("Cliente");
            header.createCell(4).setCellValue("Segmento");
            header.createCell(5).setCellValue("Motivo");
            header.createCell(6).setCellValue("Valor Sinistro");
            header.createCell(7).setCellValue("Responsavel 1");
            header.createCell(8).setCellValue("Responsavel 2");
            header.createCell(9).setCellValue("Status");
            header.createCell(10).setCellValue("Nome Cia Aérea");
            header.createCell(11).setCellValue("AWB");
            header.createCell(12).setCellValue("Nome Motorista");
            header.createCell(13).setCellValue("CPF");
            header.createCell(14).setCellValue("Placa do veiculo");
            header.createCell(15).setCellValue("Manifesto");
            header.createCell(16).setCellValue("Local");

            // Dados
            int rowNum = 1;
            for (Sinistro s : sinistros) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(s.getId());
                row.createCell(1).setCellValue(s.getDataOcorrencia());
                row.createCell(2).setCellValue(s.getNotaFiscal());
                row.createCell(3).setCellValue(s.getNomeCliente());
                row.createCell(4).setCellValue(s.getSegmento());
                row.createCell(5).setCellValue(s.getMotivo());
                row.createCell(6).setCellValue(s.getValorSinistro());
                row.createCell(7).setCellValue(s.getResponsavel1());
                row.createCell(8).setCellValue(s.getResponsavel2());
                row.createCell(9).setCellValue(s.getStatus());
                row.createCell(10).setCellValue(s.getNomeCiaAerea());
                row.createCell(11).setCellValue(s.getAwb());
                row.createCell(12).setCellValue(s.getNomeMotorista());
                row.createCell(13).setCellValue(s.getCpfMotorista());
                row.createCell(14).setCellValue(s.getPlacaVeiculo());
                row.createCell(15).setCellValue(s.getManifesto());
                row.createCell(16).setCellValue(s.getLocal());
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
