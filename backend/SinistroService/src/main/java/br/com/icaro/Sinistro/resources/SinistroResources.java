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

    @GetMapping(value = "/{id}")
    public ResponseEntity<Sinistro> buscarPorId(@PathVariable(value = "id") long id) {
        
        return sinistroService.buscarPorId(id)
                .map(sinistro -> {
                    System.out.println("Sinistro encontrado: " + sinistro);
                    return ResponseEntity.ok(sinistro);
                })
                .orElseGet(() -> {
                    System.out.println("Sinistro não encontrado para ID: " + id);
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
                });
    }
    
    // Buscar sinistro por Nota Fiscal (NF)
    @GetMapping(value = "/nf/{notaFiscal}")
    public ResponseEntity<Sinistro> findByNotaFiscal (@PathVariable(value = "notaFiscal") String notaFiscal) {
        return sinistroService.buscarPorNotaFiscal(notaFiscal)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }
    
    // Atualizar sinistro
    @PutMapping("/{id}")
    public ResponseEntity<Sinistro> atualizar(@PathVariable Long id, @RequestBody @Valid Sinistro sinistro) {
        return ResponseEntity.ok(sinistroService.atualizarSinistro(id, sinistro));
    }


    // Exclusão de sinistro
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> remover(@PathVariable(value = "id") Long id) {
        sinistroService.excluirSinistro(id);  // Exclui sinistro
        return ResponseEntity.ok("Removido com sucesso");
    }
    
    // Exportar
    @GetMapping("/exportar")
    public ResponseEntity<byte[]> exportarParaExcel() {
    	byte[] excel = sinistroService.exportarParaExcel();
    	
    	return ResponseEntity.ok()
    			.header("Content-Disposition", "attachment; filename=sinistros.xlsx")
                .header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                .body(excel);
    }
}
