import { Request, Response } from "express"
import { AccessTokenService } from "../services/AccessTokenService"


class AccessTokenController {

  /* 
  * Called AccessTokenService
  *
  * @Param companyId, clientKey
  *
  * @return object
  */  
  async handle(request: Request, response: Response) {
    const {companyId, clientKey} = request.body;

    const accessTokenService = new AccessTokenService();
    const token = await accessTokenService.execute(companyId, clientKey);

    return response.json(token);
  }
}

export {AccessTokenController}