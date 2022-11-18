import puppeteer from "puppeteer"

let page = "'De: <b>Atelier da Maggie<\/b> <span dir=\\'ltr\\'>&lt;<a href=\\'mailto:5.maggie.info@gmail.com\\'>5.maggie.info@gmail.com<\/a>&gt;<\/span><br>Assunto: <span id=\\'subj\\'>Tnt 200gr<\/span> <br><br><br><div dir=\\'ltr\\'>Exmos Senhores,<div><br><\/div><div>Pretendia adquirir cerca de 2 a 3 metros de TNT laranja com 200gr, voc\ês\ vendem ou tem alguma loja que possam indicar para poder comprar.<\/div><div><br><\/div><div>Com os melhores cumprimentos~.<\/div><div><br><\/div><div>Fico a aguardar a vossa resposta.<\/div><div><br><\/div><div>Margarida Santos<\/div><\/div></br></br>'"
let page2 = "'De: <b>Atelier da Maggie<\/b> <span dir=\\'ltr\\'>&lt;<a href=\\'mailto:5.maggie.info@gmail.com\\'>5.maggie.info@gmail.com<\/a>&gt;<\/span><br>Assunto: <span id=\\'subj\\'>Tnt 200gr<\/span> <br><br><br><div dir=\\'ltr\\'>Exmos Senhores,<div><br><\/div><div>Pretendia adquirir cerca de 2 a 3 metros de TNT laranja com 200gr, voc\ês\ vendem ou tem alguma loja que possam indicar para poder comprar.<\/div><div><br><\/div><div>Com os melhores cumprimentos~.<\/div><div><br><\/div><div>Fico a aguardar a vossa resposta.<\/div><div><br><\/div><div>Margarida Santos<\/div><\/div></br></br>'"

let html = page2 + page;

async function createPDF(htmlString) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--lang=cs-CZ,cs'] });
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({
    'accept-language': 'cs-CZ,cs;q=0.8'
  });
  await page.setContent(htmlString)
  await page.pdf({

    path: 'test.pdf',
    printBackground: true,
    format: "a4",
    margin: {
      top: "20px",
      bottom: "40px",
      left: "20px",
      right: "20px"
    }

  })
  await browser.close();
  
  
}

async function execute(html){
  const pdfCreate = await createPDF(html)
  console.log(pdfCreate)
}

execute(html);



