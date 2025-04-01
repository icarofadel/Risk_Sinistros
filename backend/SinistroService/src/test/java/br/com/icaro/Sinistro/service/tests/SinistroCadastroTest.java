package br.com.icaro.Sinistro.service.tests;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import br.com.icaro.Sinistro.domain.Sinistro;
import br.com.icaro.Sinistro.repository.ISinistroRepository;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class SinistroCadastroTest {

    @Autowired
    private ISinistroRepository sinistroRepository;

    private Sinistro sinistro;

    @BeforeEach
    void cadastroSinistro() {
        sinistroRepository.deleteAll();
        sinistro = new Sinistro();
        sinistro.setNotaFiscal("12345");
        sinistro.setNomeCliente("Cliente Teste");
        sinistroRepository.save(sinistro);
    }

    @Test
    void buscaSinistro() {
        Optional<Sinistro> buscaSinistro = sinistroRepository.findByNotaFiscal("12345");
        assertTrue(buscaSinistro.isPresent());
        assertEquals("Cliente Teste", buscaSinistro.get().getNomeCliente());
    }

    @Test
    void sinistroNaoEncontrado() {
        Optional<Sinistro> sinistroNaoEncontrado = sinistroRepository.findByNotaFiscal("9999");
        assertFalse(sinistroNaoEncontrado.isPresent());
    }
}
