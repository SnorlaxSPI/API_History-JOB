import { HistoryMessageApi } from "../api/HistoryMessageApi";
import { InternalServerError} from "../middlewares/InternalServerError"

class HistoryMessageService {
  

  /* 
  *  Called HistoryMessageAPI
  *
  * @Param token, companyId, contactId
  *
  * @return object
  */

  async execute(token: string, companyId: string, contactId: any[]) {
    
    if(!token) {
      throw new InternalServerError("Token uninformed")
    }

    
    if(!companyId) {
      throw new InternalServerError("CompanyId uninformed")
    }

    
    if(!contactId) {
      throw new InternalServerError("MessageAttendanceID uninformed");
    }

    const getHistoryMessages = new HistoryMessageApi();

    const historyMessages = await getHistoryMessages.execute(token, companyId, contactId);

    return historyMessages;
  }
  
}

export { HistoryMessageService }