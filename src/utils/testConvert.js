
import convertText from "html2plaintext"
import { htmlToText } from 'html-to-text';
let x = "\"De: <b>Atelier da Maggie<\/b> <span dir=\\\"ltr\\\">&lt;<a href=\\\"mailto:5.maggie.info@gmail.com\\\">5.maggie.info@gmail.com<\/a>&gt;<\/span><br>Assunto: <span id=\\\"subj\\\">Tnt 200gr<\/span> <br><br><br><div dir=\\\"ltr\\\">Exmos Senhores,<div><br><\/div><div>Pretendia adquirir cerca de 2 a 3 metros de TNT laranja com 200gr, voc\ês\ vendem ou tem alguma loja que possam indicar para poder comprar.<\/div><div><br><\/div><div>Com os melhores cumprimentos~.<\/div><div><br><\/div><div>Fico a aguardar a vossa resposta.<\/div><div><br><\/div><div>Margarida Santos<\/div><\/div>\\n\\n\""


const text = htmlToText(x, {
    wordwrap: 130
});
console.log(text);

