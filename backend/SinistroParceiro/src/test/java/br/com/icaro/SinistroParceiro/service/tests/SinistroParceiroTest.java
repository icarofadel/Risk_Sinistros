package br.com.icaro.SinistroParceiro.service.tests;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import br.com.icaro.SinistroParceiro.domain.SinistroParceiro;
import br.com.icaro.SinistroParceiro.repository.ISinistroParceiroRepository;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class SinistroParceiroTest {

	@Autowired
	private ISinistroParceiroRepository sinistroParceiroRepository;
	
	private SinistroParceiro sinistroParceiro;
	
	@BeforeEach
	void cadastroSinistroParceiro() {
		sinistroParceiroRepository.deleteAll();
		sinistroParceiro = new SinistroParceiro();
		sinistroParceiro.setNotaFiscal("123456");
		sinistroParceiro.setNomeCliente("Cliente Teste");
		sinistroParceiroRepository.save(sinistroParceiro);
	}
	
	@Test
	void buscaSinistroParceiro() {
		Optional<SinistroParceiro> buscaSinistroParceiro = sinistroParceiroRepository.findByNotaFiscal("123456");
		assertTrue(buscaSinistroParceiro.isPresent());
		assertEquals("Cliente Teste", buscaSinistroParceiro.get().getNomeCliente());
	}
	
	@Test
	void sinistroParceiroNaoEncontrado() {
		Optional<SinistroParceiro> sinistroParceiroNaoEncontrado = sinistroParceiroRepository.findByNotaFiscal("9999");
		assertFalse(sinistroParceiroNaoEncontrado.isPresent());
	}
}
