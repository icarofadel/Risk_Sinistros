package br.com.icaro.SinistroParceiro.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.icaro.SinistroParceiro.domain.*;

@Repository
public interface ISinistroParceiroRepository extends JpaRepository<SinistroParceiro, Long> {
	Optional<SinistroParceiro> findByNotaFiscal(String notaFiscal);
}
