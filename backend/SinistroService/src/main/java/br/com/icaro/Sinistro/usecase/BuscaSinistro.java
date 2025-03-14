package br.com.icaro.Sinistro.usecase;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;


import br.com.icaro.Sinistro.repository.ISinistroRepository;
import br.com.icaro.Sinistro.domain.Sinistro;

@Service
public class BuscaSinistro {

	// ATRIBUTO
	private ISinistroRepository sinistroRepository;

	// CONSTRUTOR
	@Autowired
	public BuscaSinistro(ISinistroRepository sinistroRepository) {
		this.sinistroRepository = sinistroRepository;
	}

	// MÉTODO (CONSULTAR CLIENTE)
	public Boolean isCadastrado(Long id) {
		Optional<Sinistro> sinistro = sinistroRepository.findById(id);
		return sinistro.isPresent() ? true : false;
	}
	
	// MÉTODO (CONSULTAR SINISTRO)
	public Optional<Sinistro> buscarPorId(Long id) {
	    return sinistroRepository.findById(id);
	}


	// MÉTODO (BUSCAR TUDO)
	public Page<Sinistro> buscar(Pageable pageable) {
		return sinistroRepository.findAll(pageable);
	}

	// MÉTODO (BUSCAR POR NF)
	public Sinistro buscarPorNotaFiscal(String notaFiscal) {
	    return sinistroRepository.findByNotaFiscal(notaFiscal)
	            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sinistro não encontrado para a Nota Fiscal: " + notaFiscal));
	}

}