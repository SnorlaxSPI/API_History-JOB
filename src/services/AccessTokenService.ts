import { AccessTokenApi } from "../api/AccessTokenApi";
import { InternalServerError} from "../middlewares/InternalServerError"


class AccessTokenService { 
  
  /* 
  * Called AccessTokenAPI
  *
  * @Param companyId, clientKey
  *
  * @return object
  */
  async execute(companyId: string, clientKey:string) {
  
    if(!companyId) {
      throw new InternalServerError("companyId uninformed");
    }
    
    if(!clientKey) {
      throw new InternalServerError("clientKey uninformed")
    }

    const getToken = new AccessTokenApi();
  
    const token = await getToken.execute(companyId, clientKey);
    

    return token;

  }

}

export {AccessTokenService}