package br.com.icaro.Sinistro.usecase;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
		return this.sinistroRepository.save(sinistro);
	}

	public void remover(Long id) {
		this.sinistroRepository.deleteById(id);
	}

}
