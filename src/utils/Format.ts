import { htmlToText } from 'html-to-text';

class Format {

  async file(message: string) {
    let data = message.replace(/\[/g,"").replace(/\]/g,"").replace(/\=/g, ":").replace(/ /g, ",").replace("image", "type:image").replace(/\"/g, "").split(",");
    return data
  }

  async email(message: string){
    let messageAltered= htmlToText(message, {
      wordwrap: 130
  })
    
    
    // let messageArray = message
    //   //.replace(/\\r/g, "")
    //   .replace(/\\n/g, "</br>")
    //   //.replace(/\\t/g, "")
    //   .replace(/\"/g, "'");
      
      return messageAltered;
  }

}
  
export {Format}