import axios from "axios";
import { InternalServerError } from "../middlewares/InternalServerError";


class AccessTokenApi {

  /* 
  * Called AccessToken API MKTZap
  *
  * @Param companyId, clientKey
  *
  * @return object
  */
  async execute(companyId: string, clientKey: string) {
    try{
      const token = await axios.get(`https://api.mktzap.com.br/company/${companyId}/token?clientKey=${clientKey}`)
      
      return token.data;

    }catch(err: any){
      throw new InternalServerError(err.message)
    }
    

  }
}

export {AccessTokenApi}