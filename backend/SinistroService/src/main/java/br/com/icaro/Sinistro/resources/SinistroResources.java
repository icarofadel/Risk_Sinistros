package br.com.icaro.Sinistro.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import br.com.icaro.Sinistro.domain.Sinistro;
import br.com.icaro.Sinistro.service.SinistroService;
import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/sinistro")
public class SinistroResources {
    
    @Autowired
    private SinistroService sinistroService;

    // Cadastro de sinistro
    @PostMapping
    public ResponseEntity<Sinistro> cadastar(@RequestBody @Valid Sinistro sinistro) {
        return ResponseEntity.ok(sinistroService.cadastrarSinistro(sinistro));
    }

    // Busca por ID
    @GetMapping(value = "/{id}")
    public ResponseEntity<Sinistro> buscarPorId(@PathVariable(value = "id") long id) {
        return sinistroService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    // Atualização de sinistro
    @PutMapping
    public ResponseEntity<Sinistro> atualizar(@RequestBody @Valid Sinistro sinistro) {
        return ResponseEntity.ok(sinistroService.atualizarSinistro(sinistro.getId(), sinistro));
    }

    // Exclusão de sinistro
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> remover(@PathVariable(value = "id") Long id) {
        sinistroService.excluirSinistro(id);  // Exclui sinistro
        return ResponseEntity.ok("Removido com sucesso");
    }
}
