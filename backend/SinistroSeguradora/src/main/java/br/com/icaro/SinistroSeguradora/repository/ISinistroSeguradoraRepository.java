package br.com.icaro.SinistroSeguradora.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.icaro.SinistroSeguradora.domain.SinistroSeguradora;

@Repository
public interface ISinistroSeguradoraRepository extends JpaRepository<SinistroSeguradora, Long>{
	Optional<SinistroSeguradora> findByNotaFiscal(String notaFiscal);
}
