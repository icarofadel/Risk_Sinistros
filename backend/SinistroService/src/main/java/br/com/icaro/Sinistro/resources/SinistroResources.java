package br.com.icaro.Sinistro.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import br.com.icaro.Sinistro.domain.Sinistro;
import br.com.icaro.Sinistro.service.SinistroService;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/sinistro")
public class SinistroResources {
    
    @Autowired
    private SinistroService sinistroService;

    //Listar todos os sinistros
    @GetMapping
    public ResponseEntity<List<Sinistro>> listarTodos() {
        return ResponseEntity.ok(sinistroService.listarTodos());
    }
    
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
    
 // Buscar sinistro por Nota Fiscal (NF)
    @GetMapping(value = "/nf/{notaFiscal}")
    public ResponseEntity<Sinistro> buscarPorNotaFiscal(@PathVariable(value = "notaFiscal") String notaFiscal) {
        return sinistroService.buscarPorNotaFiscal(notaFiscal)
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
