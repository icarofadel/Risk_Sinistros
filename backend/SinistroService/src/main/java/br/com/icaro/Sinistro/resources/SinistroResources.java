package br.com.icaro.Sinistro.resources;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import io.swagger.v3.oas.annotations.Operation;

import br.com.icaro.Sinistro.domain.Sinistro;
import br.com.icaro.Sinistro.usecase.BuscaSinistro;
import br.com.icaro.Sinistro.usecase.CadastroSinistro;
import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/sinistro")
public class SinistroResources {
	
	// ATRIBUTOS
	private BuscaSinistro buscaSinistro;
	private CadastroSinistro cadastroSinistro;
	
	// CONSTRUTOR
	@Autowired
	public void sinistroResource(BuscaSinistro buscaSinistro,
			CadastroSinistro cadastroSinistro) {
		this.buscaSinistro = buscaSinistro;
		this.cadastroSinistro = cadastroSinistro;
	}
	
	// CADASTRAR
	@PostMapping
	public ResponseEntity<Sinistro> cadastar(@RequestBody @Valid Sinistro sinistro) {
		return ResponseEntity.ok(cadastroSinistro.cadastrar(sinistro));
	}
	
	// CONSULTAR
	@GetMapping(value = "isCadastrado/{id}")
	public ResponseEntity<Boolean> isCadastrado(@PathVariable(value = "id", required = true) Long id) {
	    return ResponseEntity.ok(buscaSinistro.isCadastrado(id));
	}
	
	// ATUALIZAR
	@PutMapping
	@Operation(summary = "Atualiza um sinistro")
	public ResponseEntity<Sinistro> atualizar(@RequestBody @Valid Sinistro sinistro) {
		return ResponseEntity.ok(cadastroSinistro.atualizar(sinistro));
	}	
	

	// DELETAR
	@DeleteMapping(value = "/{id}")
	@Operation(summary = "Remove um sinistro pelo seu identificador único")
	public ResponseEntity<String> remover(@PathVariable(value = "id") Long id) {
		cadastroSinistro.remover(id);
		return ResponseEntity.ok("Removido com sucesso");
	}

	// BUSCAR
	@GetMapping
	public ResponseEntity<Page<Sinistro>> buscar(Pageable pageable) {
		return ResponseEntity.ok(buscaSinistro.buscar(pageable));
	}
	
	// BUSCAR POR ID
	@GetMapping(value = "/{id}")
	@Operation(summary = "Busca um sinistro pelo id")
	public ResponseEntity<Sinistro> buscarPorId(@PathVariable(value = "id", required = true) long id) {
		Optional<Sinistro> sinistro = buscaSinistro.buscarPorId(id);
	    
	    if (sinistro.isPresent()) {
	        return ResponseEntity.ok(sinistro.get());
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }
	}
	
    // BUSCAR POR NF
    @GetMapping(value = "/nf/{nf}")
    @Operation(summary = "Busca um sinistro pela NF")
    public ResponseEntity<Sinistro> buscarPorNf(@PathVariable("nf") String nf) {
        return ResponseEntity.ok(buscaSinistro.buscarPorNotaFiscal(nf));
    }
}
