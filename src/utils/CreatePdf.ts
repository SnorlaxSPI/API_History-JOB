import pdf from "pdfkit";

import puppetter from "puppeteer"
import fs from "fs"
import {ConvertDateHour} from "./ConvertDateHour"
import { Download } from "./Download";
import { Format } from "./Format";
import { InternalServerError } from "../middlewares/InternalServerError";
class CreatePdf {

  async execute(historyMessage: any, directory: string) {
    const convert = new ConvertDateHour();
    const download = new Download();
    const format = new Format();

    const doc = new pdf();
    doc.fontSize(14)
    doc.moveDown();
    doc.text(`Nome: ${historyMessage.name}`)
    doc.text(`Telefone: ${historyMessage.contactId.split('_')[2]}`);
    doc.text(`Protocolo: ${historyMessage.protocol}`)
    doc.text(`Iniciou o contato em ${convert.date(historyMessage.firstMessageAt)} às ${convert.hour(historyMessage.firstMessageAt)}`)
    doc.moveDown();
    doc.moveDown();
    for(const m of historyMessage.messages) {
      const newLocal = m.message.indexOf("https://s3.amazonaws.com/mktzap-media-storage-master");
      if(newLocal >= 0){
        let dataImage = await format.file(m.message);
        let url = dataImage.find((el: any) => el.indexOf("https://s3.amazonaws.com/mktzap-media-storage-master") >= 0)
        let typeMedia: any = dataImage.find((el: any) => el.indexOf("image") >= 0 || el.indexOf("document") >= 0|| el.indexOf("audio") >= 0 || el.indexOf("attachment") >= 0 || el.indexOf("video") >= 0);

        if(!url){
          throw new InternalServerError("Error url media file")
        }
        
        if(!typeMedia){
          console.log("Protocol: " + historyMessage.protocol)
          console.log("Type: " + typeMedia)
          console.log("DataImage: " + dataImage)
          console.log("mensageWithError", m)
          throw new InternalServerError("Error type media file")
          
        }
        if(typeMedia === "type:image"){
          await download.image(directory, url.slice(5), m.id);
          doc.moveDown();
          doc.text(`${convert.dateComplete(m.createdAt)}:`) 
          doc
            .fillColor("blue")
            .text(`Clique aqui para visualizar "${m.id}.jpg"`, {link: `${m.id}.jpg`})


        } else if(typeMedia ==="type:document" || typeMedia ==="attachment"){
          await download.document(directory, url.slice(5), m.id)
          doc.moveDown();
          doc.text(`${convert.dateComplete(m.createdAt)}:`)
          doc
            .fillColor("blue")
            .text(`Clique aqui para visualizar "${m.id}.pdf"`, {link: `${m.id}.pdf`})

        } else if(typeMedia ==='type:audio'){
          await download.audio(directory, url.slice(5), m.id);
          doc.moveDown();
          doc.text(`${convert.dateComplete(m.createdAt)}:`)
          doc
            .fillColor("blue")
            .text(`Clique aqui para visualizar "${m.id}.mp3"`, {link: `${m.id}.mp3`})
        } else if(typeMedia ==='type:video'){
          await download.video(directory, url.slice(5), m.id);
          doc.moveDown();
          doc.text(`${convert.dateComplete(m.createdAt)}:`)
          doc
            .fillColor("blue")
            .text(`Clique aqui para visualizar "${m.id}.mp4"`, {link: `${m.id}.mp4`})
        }

      } else{
        if(historyMessage.contactId.slice(0,2) === "em"){
          doc.moveDown();
          doc
          .fillColor("black")
          .text(`${convert.dateComplete(m.createdAt)}: ${await format.email(m.message)}`);

        } else{
          doc.moveDown();
          doc
            .fillColor("black")
            .text(`${convert.dateComplete(m.createdAt)}: ${m.message}`);
        }
        
      }
      
    }

    if(historyMessage.contactId.split('_')[0] != "waweb") {
      doc.pipe(fs.createWriteStream(`${directory}/${historyMessage.contactId.split('_')[2]}}_${historyMessage.protocol}.pdf`));  
      doc.end();
    
      return 
    }

    doc.pipe(fs.createWriteStream(`${directory}/${historyMessage.contactId.split('_')[2]}.pdf`));
    doc.end();
    
  
  
  }

  async byHtml(historyMessage: any, directory: string) {
    const convert = new ConvertDateHour();
    const format = new Format();
    
    
    for(const m of historyMessage.messages) {
      // const stringToHTML = function (str: string) {
      //   var parser = new DOMParser();
      //   var doc = parser.parseFromString(str, 'text/html');
      //   return doc.body;
      // };
      const browser = await puppetter.launch({ args: ['--no-sandbox', '--lang=cs-CZ,cs'] });
      
      const html = format.email(m.message);
      // const html =`
      //   <div>
      //     <h3>Protocolo: ${historyMessage.protocol}</h3>
      //     <h3>Iniciou o contato em ${convert.date(historyMessage.firstMessageAt)} às ${convert.hour(historyMessage.firstMessageAt)}</h3>
      //   </div>
      //   </br>
      //   </br>
      //   <div>${format.email(m.message)}</div>
      // ` 
    

      const page = await browser.newPage();
      await page.setExtraHTTPHeaders({
          'accept-language': 'cs-CZ,cs;q=0.8'
      });
      await page.setContent(await html)
      
      await page.pdf({
        path: `${directory}/${historyMessage.name}_${historyMessage.protocol}.pdf`,
        printBackground: true,
        format: "A4",
        margin: {
          top: "20px",
          bottom: "40px",
          left: "20px",
          right: "20px"
        }
  
      })
      await browser.close();

  }

        
  
      // for(const m of historyMessage.messages) {
      //   await htmlPdf.create(m.message).toFile(`${directory}/${historyMessage.name}_${historyMessage.protocol}.pdf`, function(err, res) {
      //     if (err) return console.log(err);
      //     console.log(res);
      //   });  
      // }
      


  }

}

export { CreatePdf }