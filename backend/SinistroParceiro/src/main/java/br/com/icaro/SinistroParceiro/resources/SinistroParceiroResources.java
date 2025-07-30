package br.com.icaro.SinistroParceiro.resources;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import br.com.icaro.SinistroParceiro.domain.SinistroParceiro;
import br.com.icaro.SinistroParceiro.service.SinistroParceiroService;
import jakarta.validation.Valid;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/sinistroParceiro")
public class SinistroParceiroResources {
	
	@Autowired
	private SinistroParceiroService sinistroParceiroService;
	
	//Listar todos os sinistros de parceiros
	@GetMapping
	public ResponseEntity<List<SinistroParceiro>> listarTodos() {
		return ResponseEntity.ok(sinistroParceiroService.listarTodos());
	}
	
	//Cadastro de sinistro parceiro
	@PostMapping
	public ResponseEntity<SinistroParceiro> cadastrar(@RequestBody @Valid SinistroParceiro sinistroParceiro){
		return ResponseEntity.ok(sinistroParceiroService.cadastrarSinistroParceiro(sinistroParceiro));
	}
	
    @GetMapping(value = "/{id}")
    public ResponseEntity<SinistroParceiro> buscarPorId(@PathVariable(value = "id") long id){
    	 return sinistroParceiroService.buscarPorId(id)
                 .map(sinistroParceiro -> {
                     System.out.println("Sinistro encontrado: " + sinistroParceiro);
                     return ResponseEntity.ok(sinistroParceiro);
                 })
                 .orElseGet(() -> {
                     System.out.println("Sinistro não encontrado para ID: " + id);
                     return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
                 });
     }
    
 // Buscar sinistro por Nota Fiscal (NF)
    @GetMapping(value = "/nf/{notaFiscal}")
    public ResponseEntity<SinistroParceiro> findByNotaFiscal (@PathVariable(value = "notaFiscal") String notaFiscal) {
        return sinistroParceiroService.buscarPorNotaFiscal(notaFiscal)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }
    
    // Atualizar sinistro
    @PutMapping("/{id}")
    public ResponseEntity<SinistroParceiro> atualizar(@PathVariable Long id, @RequestBody @Valid SinistroParceiro sinistroParceiro) {
        return ResponseEntity.ok(sinistroParceiroService.atualizarSinistroParceiro(id, sinistroParceiro));
    }


    // Exclusão de sinistro
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> remover(@PathVariable(value = "id") Long id) {
        sinistroParceiroService.excluirSinistroParceiro(id);  // Exclui sinistro
        return ResponseEntity.ok("Removido com sucesso");
    }
    
    // Exportar
    @GetMapping("/exportar")
    public ResponseEntity<byte[]> exportarParaExcel() {
    	byte[] excel = sinistroParceiroService.exportarParaExcel();
    	
    	return ResponseEntity.ok()
    			.header("Content-Disposition", "attachment; filename=sinistros.xlsx")
                .header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                .body(excel);
    }
}
