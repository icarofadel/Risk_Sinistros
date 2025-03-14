package br.com.icaro.Sinistro.service.tests;

import static org.junit.jupiter.api.Assertions.*;

import br.com.icaro.Sinistro.domain.Sinistro;
import br.com.icaro.Sinistro.repository.ISinistroRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
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

    // teste de cadastro
    @BeforeEach
    void cadastroSinistro() {
    	sinistroRepository.deleteAll();
        sinistro = new Sinistro();
        sinistro.setNotaFiscal("12345");
        sinistro.setNomeCliente("Cliente Teste");
        sinistroRepository.save(sinistro);
    }

    // teste de busca sinistro
    @Test
    void buscaSinistro() {
        Optional<Sinistro> buscaSinistro = sinistroRepository.findByNotaFiscal("12345");
        assertTrue(buscaSinistro.isPresent());
        assertEquals("Cliente Teste", buscaSinistro.get().getNomeCliente());
    }

    // teste de busca (Não encontrado).
    @Test
    void sinistroNaoEncontrado() {
        Optional<Sinistro> sinistroNaoEncontrado = sinistroRepository.findByNotaFiscal("9999");
        assertFalse(sinistroNaoEncontrado.isPresent());
    }
    
    // Teste de atualização de sinistro
    @Test
    void atualizaSinistro() {
    	Optional<Sinistro> buscaSinistro = sinistroRepository.findByNotaFiscal("12345");
    	assertTrue(buscaSinistro.isPresent());
    	
    	Sinistro atualizaSinistro = buscaSinistro.get();
    	atualizaSinistro.setNomeCliente("Samsung");
    	sinistroRepository.save(atualizaSinistro);
    	
    	Optional<Sinistro> sinistroAtualizado = sinistroRepository.findByNotaFiscal("12345");
    	
        assertTrue(sinistroAtualizado.isPresent());
    	assertEquals("Samsung", sinistroAtualizado.get().getNomeCliente());
    }
    
    // Teste de exclusão
    @Test
    void deleteSinistroPorId() {
        Sinistro foundSinistro = sinistroRepository.findByNotaFiscal("12345").get();
        
        sinistroRepository.deleteById(foundSinistro.getId());
        
        Optional<Sinistro> deletedSinistro = sinistroRepository.findById(foundSinistro.getId());
        
        assertFalse(deletedSinistro.isPresent());
    }

}
