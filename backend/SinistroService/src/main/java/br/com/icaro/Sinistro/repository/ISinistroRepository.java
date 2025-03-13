package br.com.icaro.Sinistro.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.icaro.Sinistro.domain.*;

@Repository
public interface ISinistroRepository extends JpaRepository<Sinistro, Long> {
    Optional<Sinistro> findByNotaFiscal(String notaFiscal);
}
