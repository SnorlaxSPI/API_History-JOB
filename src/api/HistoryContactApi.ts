import axios from "axios";
import { response } from "express";
import { InternalServerError } from "../middlewares/InternalServerError";


class HistoryContactApi {

  /* 
  * Called HistoryContact API MKTZap
  *
  * @Param token, companyId, dateFrom, dateTo
  *
  * @return object
  */
  async execute(token: string, companyId: string, dateFrom: string, dateTo: string) {
    try{
      //variável para receber objeto com message_id
      let contactId: any[] = [];

      let i = 1;
      let condition = false;

      while(!condition) {
        //requisição historyContact
        let historyContacts = await axios.get(`https://api.mktzap.com.br/company/${companyId}/historycontact?createdFrom=${dateFrom}T03:00:00Z&createdTo=${dateTo}T03:00:00Z`,
        {
          headers: {
            //declarar parâmetros da função accessToken
            Authorization: `Bearer ${token}`,
            "x-page": `${i}`,
            

          }
        })

        if(historyContacts.data.length === 0){
          break
        }
        
        //itera em cada retorno do history contact
        historyContacts.data.forEach((item: { id: any; name: any; contact_id: any; protocol: any; first_message_at: any} ) => {
          console.log("Item Req", item)

          if(item.name.search(/\\u/g) >= 0 || item.name === "") {
            item.name = item.contact_id.split('_')[2]
          } else {
            item.name = JSON.parse(item.name)
          }
          //armazena as informações selecionadas no objeto message
          let message = {
            message_id: item.id,
            protocol: item.protocol,
            name: item.name,
            firstMessageAt: item.first_message_at,
            contact_id: item.contact_id
          }
          //armazena o objeto no array de objetos
          contactId.push(message);
        });
        
        i++;
      }
      
      return contactId;


    }catch(err: any){
      console.log("nome", err)
      //console.log("Linha", err.stack)
      throw new InternalServerError("Failed requisition: " + err.message)

    }
  }

}

export {HistoryContactApi}  