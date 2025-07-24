package br.com.icaro.SinistroSeguradora.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "sinistros_seguradora")
@Data
@NoArgsConstructor 
@AllArgsConstructor
public class SinistroSeguradora {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String procSeguradora;
	
	private String segurado;
	
	private String nApolice;
	
	@Column(name = "nota_fiscal", nullable = false, unique = true)
	private String notaFiscal;
	
	private String conhecimento;
	
	private String nomeCliente;
	
	private String tipoMercadoria;
	
	private Double valorEmbarcado;
	
	private Double valorNf;
	
	private Double estimativaPrejuizo;
	
	private String Natureza;
	
	private LocalDate dataOcorrencia;
	
	private String resumo;
	
	private String pagador;
	
	private String remetente;
	
	private String cidadeOrigem;
	
	private String destinatario;
	
	private String cidadeDestino;
	
	//opcional sinistro na cia aérea
	
	private String nomeCiaAerea;
	
	private String awb;
	
	//opcional sinistro rodoviário
	
	private String motorista;
	
	private Number cpf;
	
	private String placa;
	
	private Number manifesto;
	
	private String Local;
	
	private String status;
	
}
