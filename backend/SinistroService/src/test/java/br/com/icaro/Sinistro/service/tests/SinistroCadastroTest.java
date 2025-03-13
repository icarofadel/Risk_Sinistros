package br.com.icaro.Sinistro.service.tests;

import static org.junit.jupiter.api.Assertions.*;

import br.com.icaro.Sinistro.domain.Sinistro;
import br.com.icaro.Sinistro.repository.ISinistroRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class SinistroCadastroTest {
    @Autowired
    private ISinistroRepository sinistroRepository;

    private Sinistro sinistro;

    @BeforeEach
    void setUp() {
        sinistro = new Sinistro();
        sinistro.setNotaFiscal("12345");
        sinistro.setNomeCliente("Cliente Teste");
        sinistroRepository.save(sinistro);
    }

    @Test
    void findByNotaFiscal() {
        Optional<Sinistro> foundSinistro = sinistroRepository.findByNotaFiscal("12345");
        assertTrue(foundSinistro.isPresent());
        assertEquals("Cliente Teste", foundSinistro.get().getNomeCliente());
    }

    @Test
    void findByNotaFiscalNotFound() {
        Optional<Sinistro> foundSinistro = sinistroRepository.findByNotaFiscal("99999");
        assertFalse(foundSinistro.isPresent());
    }
}
