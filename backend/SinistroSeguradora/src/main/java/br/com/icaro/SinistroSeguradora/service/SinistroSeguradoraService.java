package br.com.icaro.SinistroSeguradora.service;


import java.util.List;
import java.util.Optional;

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
	
}
