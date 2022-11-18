import express, { Router,Request, Response, NextFunction, Handler, response  } from "express";
import { AccessTokenController } from "../controllers/AccessTokenController";
import { HistoryGeneratorController } from "../controllers/HistoryGeneratorController";
import { sendToQueue } from "../rabbitmq-server";

const resolver = (handlerFn: Handler) =>{
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      return await Promise.resolve(handlerFn(request, response, next));
    } catch (e) {
      return next(e);
    }
  }
}

const router = Router();

const accessTokenController = new AccessTokenController;

const historyGeneratorController = new HistoryGeneratorController



router.post('/token', resolver(accessTokenController.handle))

router.post('/history', (request: Request, response: Response)=>{
  
  sendToQueue("companyData", request.body);
  return response.json();
})




export { router }