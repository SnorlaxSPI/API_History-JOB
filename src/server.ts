import express, { Request, Response, NextFunction, Handler } from "express"
import { router } from "./routes/routes";
import {InternalServerError} from "./middlewares/InternalServerError"

const app = express();

//possibilita app receber body em json
app.use(express.json());

//importa middleware de rotas para o app
app.use(router);

// caso as validações retornarem o throw new error, retornará a mensagem de erro do Service
app.use((error: InternalServerError, request: Request, response: Response, next: NextFunction)=>{
  if(error && error.statusCode) {
    return response.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message
      })
  }
  
})


app.listen(3333, () => {
  console.log("🚀🚀 Server Started!!");
});
