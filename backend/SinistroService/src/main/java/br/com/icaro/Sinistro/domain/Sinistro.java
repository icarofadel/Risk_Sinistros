package br.com.icaro.Sinistro.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "sinistros")
@Data
@NoArgsConstructor 
@AllArgsConstructor
public class Sinistro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private LocalDate dataOcorrencia;
    
    @Column(name = "nota_fiscal", nullable = false, unique = true)
    private String notaFiscal; 
    
    private String nomeCliente;
    
    private String segmento;
    
    private String motivo;
    
    private Double valorSinistro;
    
    private String responsavel1;
    
    private String responsavel2;
    
    private String status;
    
    private Boolean ciaAerea;
    
    private Boolean motorista;
    
    private String nomeCiaAerea;
    
    private int awb;
    
    private String nomeMotorista;
    
    private String cpfMotorista;
    
    private String placaVeiculo;
    
    private String manifesto;
    
    private String local;
    
    private Boolean entregueFinanceiro;
    
    private LocalDate dataEntrega;
}
