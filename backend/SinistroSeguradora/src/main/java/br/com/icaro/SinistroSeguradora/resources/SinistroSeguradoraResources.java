package br.com.icaro.SinistroSeguradora.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.icaro.SinistroSeguradora.domain.SinistroSeguradora;
import br.com.icaro.SinistroSeguradora.service.SinistroSeguradoraService;

import org.springframework.http.HttpStatus;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/sinistroSeguradora")
public class SinistroSeguradoraResources {

	@Autowired
	private SinistroSeguradoraService sinistroSeguradoraService;
	
	@GetMapping
	public ResponseEntity<List<SinistroSeguradora>> listarTodos() {
		return ResponseEntity.ok(sinistroSeguradoraService.listarTodos());
	}
	
	@PostMapping
	public ResponseEntity<SinistroSeguradora> cadastrar(@RequestBody @Valid SinistroSeguradora sinistroSeg) {
		return ResponseEntity.ok(sinistroSeguradoraService.cadastrarSinistro(sinistroSeg));
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<SinistroSeguradora> buscarPorId(@PathVariable(value = "id") long id) {
		
		return sinistroSeguradoraService.buscarPorId(id).map(sinistro -> {
			System.out.println("Sinistro encontrado: " + sinistro);
			return ResponseEntity.ok(sinistro);
		})
		.orElseGet(() -> {
			   System.out.println("Sinistro não encontrado para ID: " + id);
               return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
           });
	}

	@GetMapping(value = "/nf/{notaFiscal}")
	public ResponseEntity<SinistroSeguradora> findByNotaFiscal (@PathVariable(value = "notaFiscal") String notaFiscal) {
		   return sinistroSeguradoraService.buscarPorNotaFiscal(notaFiscal)
		           .map(ResponseEntity::ok)
		           .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
	}
		
	@PutMapping("/{id}")
	public ResponseEntity<SinistroSeguradora> atualizar(@PathVariable Long id, @RequestBody @Valid SinistroSeguradora sinistro) {
	   return ResponseEntity.ok(sinistroSeguradoraService.atualizarSinistro(id, sinistro));
	}
	
    // Exportar
    @GetMapping("/exportar")
    public ResponseEntity<byte[]> exportarParaExcel() {
    	byte[] excel = sinistroSeguradoraService.exportarParaExcel();
    	
    	return ResponseEntity.ok()
    			.header("Content-Disposition", "attachment; filename=sinistros.xlsx")
                .header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                .body(excel);
    }
}
