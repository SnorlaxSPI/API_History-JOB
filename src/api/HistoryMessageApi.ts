import axios from "axios";
import { InternalServerError } from "../middlewares/InternalServerError"
import fs from 'fs';


class HistoryMessageApi {

  /* 
  * Called HistoryMessage API MKTZap
  *
  * @Param token, companyId, message
  *
  * @return object
  */

  async execute(token: string, companyId: string, message: any[]) {
    try {
      let cards: { messageId: { id: any }; messages: any[] }[] = [];

      const historyMessages =
        await axios.
          get(
            `https://api.mktzap.com.br/company/${companyId}/history/${message.message_id}/message`,
            {
              headers: {
                "Content-type": "application/json",
                "charset": "UTF-8",
                Authorization: `Bearer ${token}`,
              },
            }
            )
            
            let cardData = {
              messageId: message.message_id,
              protocol: message.protocol,
              firstMessageAt: message.firstMessageAt,
              name: message.name,
              contactId: message.contact_id,
              messages: Array(),
            };


      historyMessages.data.forEach(async (item: { id: any; history_id: string; message: string; created_at: string }) => {
        
      if (item.message.search(/<[^>]*>/g) >= 0) {
          cardData.messages.push({ id: item.id, createdAt: item.created_at, message: item.message });
      } else {
        cardData.messages.push({ id: item.id, createdAt: item.created_at, message: JSON.parse(item.message) });
        }
      });
      cards.push(cardData);

      return cards;

    } catch (err: any) {
      console.log(err);
      throw new InternalServerError("Error requisition: " + err.message);
    }
  }
}

export { HistoryMessageApi }