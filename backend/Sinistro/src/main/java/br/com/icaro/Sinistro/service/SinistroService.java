package br.com.icaro.Sinistro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.icaro.Sinistro.model.Sinistro;
import br.com.icaro.Sinistro.repository.SinistroRepository;

@Service
public class SinistroService {

	@Autowired
	private SinistroRepository sinistroRepository;
	
	public Sinistro cadastrarSinistro(Sinistro sinistro) {
		return sinistroRepository.save(sinistro);
	}
	
	public List<Sinistro> listarTodos() {
		return sinistroRepository.findAll();
	}
	
	public Optional<Sinistro> buscarPorId(Long id) {
		return sinistroRepository.findById(id);
	}
	
	public Sinistro atualizarSinistro(Long id, Sinistro novosDados) {
		return sinistroRepository.findById(id).map(sinistro -> {
			if (novosDados.getDataOcorrencia() != null) {
                sinistro.setDataOcorrencia(novosDados.getDataOcorrencia());
            }
            if (novosDados.getNotaFiscal() != null) {
                sinistro.setNotaFiscal(novosDados.getNotaFiscal());
            }
            if (novosDados.getNomeCliente() != null) {
                sinistro.setNomeCliente(novosDados.getNomeCliente());
            }
            if (novosDados.getSegmento() != null) {
                sinistro.setSegmento(novosDados.getSegmento());
            }
            if (novosDados.getMotivo() != null) {
                sinistro.setMotivo(novosDados.getMotivo());
            }
            if (novosDados.getValorSinistro() != null) {
                sinistro.setValorSinistro(novosDados.getValorSinistro());
            }
            if (novosDados.getResponsavel1() != null) {
                sinistro.setResponsavel1(novosDados.getResponsavel1());
            }
            if (novosDados.getResponsavel2() != null) {
                sinistro.setResponsavel2(novosDados.getResponsavel2());
            }
            if (novosDados.getStatus() != null) {
                sinistro.setStatus(novosDados.getStatus());
            }
            return sinistroRepository.save(sinistro);
        }).orElseThrow(() -> new RuntimeException("Sinistro não encontrado"));
	}
	
	public void excluirSinistro(Long id) {
		sinistroRepository.deleteById(id);
	}
}
