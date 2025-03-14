package br.com.icaro.Sinistro.usecase;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import br.com.icaro.Sinistro.domain.Sinistro;
import br.com.icaro.Sinistro.repository.ISinistroRepository;

@Service
public class CadastroSinistro {

	private ISinistroRepository sinistroRepository;
	
	@Autowired
	public CadastroSinistro(ISinistroRepository sinistroRepository) {
		this.sinistroRepository = sinistroRepository;
	}
	
	public Sinistro cadastrar(@Valid Sinistro sinistro) {
		return this.sinistroRepository.save(sinistro);
	}

	public Sinistro atualizar(@Valid Sinistro sinistro) {
	    if (!sinistroRepository.existsById(sinistro.getId())) {
	        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sinistro não encontrado para atualização");
	    }
	    return sinistroRepository.save(sinistro);
	}

	public void remover(Long id) {
		this.sinistroRepository.deleteById(id);
	}

}
