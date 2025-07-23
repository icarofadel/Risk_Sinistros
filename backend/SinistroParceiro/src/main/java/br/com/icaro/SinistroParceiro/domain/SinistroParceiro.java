package br.com.icaro.SinistroParceiro.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "sinistros_parceiros")
@Data
@NoArgsConstructor 
@AllArgsConstructor
public class SinistroParceiro {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private LocalDate dataOcorrencia;
	
	@Column(name = "nota_fiscal", nullable = false, unique = true)
	private String notaFiscal;
	
	private String nomeCliente;
	
	private String motivo;
	
	private Double valorSinistro;
	
	private String sacador;
	
	private String sacado;
	
	private LocalDate envioControladoria;
	
	private String nFatura;
	
}
