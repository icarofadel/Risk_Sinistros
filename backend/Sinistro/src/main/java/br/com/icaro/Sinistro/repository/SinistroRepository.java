package br.com.icaro.Sinistro.repository;

import br.com.icaro.Sinistro.model.Sinistro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SinistroRepository extends JpaRepository<Sinistro, Long> {
}
