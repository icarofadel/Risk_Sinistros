package br.com.icaro.SinistroParceiro.service;

import java.util.List;
import java.util.Optional;

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
}
