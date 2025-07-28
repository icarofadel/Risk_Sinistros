package br.com.icaro.SinistroParceiro.service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Image;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfContentByte;
import com.lowagie.text.pdf.PdfWriter;

import br.com.icaro.SinistroParceiro.domain.SinistroParceiro;

@Service
public class SinistroParceiroServiceExtracao {

	public ByteArrayOutputStream gerarCartaPdfEmMemoria(SinistroParceiro sinistro) throws Exception {
	    ByteArrayOutputStream baos = new ByteArrayOutputStream();
	    Document document = new Document(PageSize.A4);
	    PdfWriter writer = PdfWriter.getInstance(document, baos);
	    document.open();
	
	    // Carregar imagem do papel timbrado dos resources usando ClassPathResource
	    
	    InputStream is = null;
	    try {
	        is = new ClassPathResource("static/papel_timbrado_grupo_ibl.jpg").getInputStream();
	        Image background = Image.getInstance(is.readAllBytes());
	        background.setAbsolutePosition(0, 0);
	        background.scaleToFit(PageSize.A4.getWidth(), PageSize.A4.getHeight());
	
	        PdfContentByte canvas = writer.getDirectContentUnder();
	        canvas.addImage(background);
	    } catch (Exception e) {
	        // Se der problema ao carregar imagem, só loga e segue (para não impedir a geração)
	        System.err.println("Não foi possível carregar a imagem do papel timbrado: " + e.getMessage());
	    } finally {
	        if (is != null) is.close();
	    }
	    
	
	    // Espaço e título
	    document.add(new Paragraph(" "));
	    document.add(new Paragraph(" "));
	
	    Font tituloFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16);
	    Paragraph titulo = new Paragraph("NOTIFICAÇÃO DE COBRANÇA", tituloFont);
	    titulo.setAlignment(Element.ALIGN_CENTER);
	    document.add(titulo);
	
	    document.add(new Paragraph(" "));
	
	    // Corpo do texto
	    Font corpoFont = FontFactory.getFont(FontFactory.HELVETICA, 12);
	    Paragraph corpo = new Paragraph(
	        "Prezados,\n\n" +
	        "A empresa " + sinistro.getSacador() + " vem por meio deste documento notificar vossa empresa.\n\n" +
	        "Referente à cobrança devida à ocorrência de " + sinistro.getMotivo() +
	        " no transporte do documento fiscal: " + sinistro.getNotaFiscal() +
	        ", gerando o custo processual com danos à carga no valor de R$ " + sinistro.getValorSinistro() + ".\n\n" +
	        "O departamento de agentes da empresa " + sinistro.getSacador() +
	        " entrará em contato via e-mail/telefone para tratar da negociação do débito, análise do mesmo e definição da melhor forma de pagamento.\n\n" +
	        "Caso considere esta notificação indevida, pedimos que envie as evidências e justificativas pertinentes.\n\n" +
	        "Protocolo: " + sinistro.getId() + "\n" +
	        "Parceiro: " + sinistro.getSacado() + "\n" +
	        "Nota fiscal: " + sinistro.getNotaFiscal() + "\n" +
	        "Data da Ocorrência: " + sinistro.getDataOcorrencia() + "\n" +
	        "Motivo: " + sinistro.getMotivo() + "\n\n" +
	        "Atenciosamente,\nEquipe de Sinistros",
	        corpoFont
	    );
	    corpo.setAlignment(Element.ALIGN_JUSTIFIED);
	    document.add(corpo);
	
	    document.close();
	    return baos;
	}
}
