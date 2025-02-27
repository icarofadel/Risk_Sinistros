package br.com.icaro.Sinistro.model;

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
    private String notaFiscal;
    private String nomeCliente;
    private String segmento;
    private String motivo;
    private Double valorSinistro;
    private String responsavel1;
    private String responsavel2;
    private String status;
    private String ciaAerea;
    private String motorista;
    private String cpfMotorista;
    private String placaVeiculo;
    private String manifesto;
    private String local;
    private Boolean entregueFinanceiro;
    private LocalDate dataEntrega;
}
