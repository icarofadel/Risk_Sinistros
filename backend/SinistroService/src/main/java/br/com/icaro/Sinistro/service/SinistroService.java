package br.com.icaro.Sinistro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

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
            System.out.println("Atualizando sinistro ID: " + id);
            System.out.println("Novos dados: " + novosDados.toString());

            if (novosDados.getDataOcorrencia() != null) sinistro.setDataOcorrencia(novosDados.getDataOcorrencia());
            if (novosDados.getNotaFiscal() != null) sinistro.setNotaFiscal(novosDados.getNotaFiscal());
            if (novosDados.getNomeCliente() != null) sinistro.setNomeCliente(novosDados.getNomeCliente());
            if (novosDados.getSegmento() != null) sinistro.setSegmento(novosDados.getSegmento());
            if (novosDados.getMotivo() != null) sinistro.setMotivo(novosDados.getMotivo());
            if (novosDados.getValorSinistro() != null) sinistro.setValorSinistro(novosDados.getValorSinistro());
            if (novosDados.getResponsavel1() != null) sinistro.setResponsavel1(novosDados.getResponsavel1());
            if (novosDados.getResponsavel2() != null) sinistro.setResponsavel2(novosDados.getResponsavel2());
            if (novosDados.getStatus() != null) sinistro.setStatus(novosDados.getStatus());

            return sinistroRepository.save(sinistro);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sinistro não encontrado"));
    }


    
    public void excluirSinistro(Long id) {
        if (!sinistroRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sinistro não encontrado");
        }
        sinistroRepository.deleteById(id);  // Exclui o sinistro do banco
    }
}
