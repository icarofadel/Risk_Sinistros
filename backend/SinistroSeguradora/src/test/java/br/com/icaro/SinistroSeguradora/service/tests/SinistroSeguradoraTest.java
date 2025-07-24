package br.com.icaro.SinistroSeguradora.service.tests;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import br.com.icaro.SinistroSeguradora.domain.SinistroSeguradora;
import br.com.icaro.SinistroSeguradora.repository.ISinistroSeguradoraRepository;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class SinistroSeguradoraTest {

	@Autowired
	private ISinistroSeguradoraRepository sinistroSeguradoraRepository;
	
	private SinistroSeguradora sinistroSeguradora;
	
	@BeforeEach
	void cadastroSeguradora() {
		sinistroSeguradoraRepository.deleteAll();
		sinistroSeguradora = new SinistroSeguradora();
		sinistroSeguradora.setNotaFiscal("123456");
		sinistroSeguradora.setNomeCliente("Cliente Teste");
		sinistroSeguradoraRepository.save(sinistroSeguradora);
	}
	
	@Test
	void buscaSinistroSeguradora() {
		Optional<SinistroSeguradora> buscaSinistroSeguradora = sinistroSeguradoraRepository.findByNotaFiscal("123456");
		assertTrue(buscaSinistroSeguradora.isPresent());
		assertEquals("Cliente Teste", buscaSinistroSeguradora.get().getNomeCliente());
	}
	
	@Test
	void sinistroSeguradoraNaoEncontrado() {
		Optional<SinistroSeguradora> sinistroSeguradoraNaoEncontrado = sinistroSeguradoraRepository.findByNotaFiscal("9999");
		assertFalse(sinistroSeguradoraNaoEncontrado.isPresent());
	}
}