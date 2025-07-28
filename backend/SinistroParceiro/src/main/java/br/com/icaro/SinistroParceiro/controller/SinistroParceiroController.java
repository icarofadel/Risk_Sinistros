package br.com.icaro.SinistroParceiro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.com.icaro.SinistroParceiro.domain.SinistroParceiro;
import br.com.icaro.SinistroParceiro.service.SinistroParceiroService;
import br.com.icaro.SinistroParceiro.service.SinistroParceiroServiceExtracao;

@RestController
@RequestMapping("/sinistroParceiro")
public class SinistroParceiroController {

    @Autowired
    private SinistroParceiroService sinistroParceiroService;

    @Autowired
    private SinistroParceiroServiceExtracao SinistroParceiroExtracao;

    @GetMapping("/Nc-Parceiro/{id}")
    public ResponseEntity<byte[]> exportarCarta(@PathVariable Long id) {
        SinistroParceiro sinistro = sinistroParceiroService.buscarPorId(id)
            .orElseThrow();

        try {
        	byte[] cartaPdf = SinistroParceiroExtracao.gerarCartaPdfEmMemoria(sinistro).toByteArray();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.attachment().filename("carta_parceiro.pdf").build());

            return ResponseEntity.ok().headers(headers).body(cartaPdf);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao gerar PDF", e);
        }
    }
}