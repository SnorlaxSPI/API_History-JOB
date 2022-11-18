import Fs from "fs";
import Axios from "axios";
import Path from "path";
import { InternalServerError } from "../middlewares/InternalServerError";
import { Http2ServerRequest } from "http2";
import retry from 'axios-retry';


const https = require("https")
/* Axios.defaults.timeout = 60000;
Axios.defaults.httpsAgent = new https.Agent({ keepAlive: true }) */

const axiosInstance = Axios.create({
  timeout: 60000,
  method: 'GET',
  responseType: 'stream',
  httpsAgent: new https.Agent({ keepAlive: true })
})

retry(axiosInstance, {
  retries: 3
})

class Download {
  async image( directory: string,urlImage: string, idMessage: string) {
    const url = urlImage;
    const path = Path.resolve(`${directory}/${idMessage}.jpg`);
    console.log(path);
    const writer = Fs.createWriteStream(path);
    
    const response = await axiosInstance({
      url
    })
  
    response.data.pipe(writer);
  
    return new Promise((resolve, reject) => {
      console.log(url);
      writer.on('finish', resolve)
      writer.on('error', (err: any)=>{
        throw new InternalServerError(err);

      })
    
    })

    
    
    /* try{
      const url = urlImage;
      const path = Path.resolve(`${directory}/${idMessage}.jpg`);
      console.log(path);
      const writer = Fs.createWriteStream(path);
      
      const response = await Axios({
        url,
        method: "GET",
        responseType: "stream"
      })
    
      response.data.pipe(writer);
    
      return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
      
      })
 
    } catch(err: any) {
      console.log(directory)
      console.log(urlImage)
      console.log(idMessage)
      //throw new InternalServerError(err)
    } */
     
  }

  async document( directory: string,urlDocument: string, idMessage: string) {
    const url = urlDocument;
      const path = Path.resolve(`${directory}/${idMessage}.pdf`);
      console.log(path);
      const writer = Fs.createWriteStream(path);
      
      const response = await axiosInstance({
        url
      })
    
      response.data.pipe(writer);
    
      return new Promise((resolve, reject) => {
        console.log(url)
        writer.on('finish', resolve)
        writer.on('error', reject)
      
      })
    
    
    
    /* try{
      const url = urlDocument;
      const path = Path.resolve(`${directory}/${idMessage}.pdf`);
      console.log(path);
      const writer = Fs.createWriteStream(path);
      
      const response = await Axios({
        url,
        method: "GET",
        responseType: "stream"
      })
    
      response.data.pipe(writer);
    
      return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
      
      })

    } catch(err: any) {
      console.log(directory)
      console.log(urlDocument)
      console.log(idMessage)
      //throw new InternalServerError(err)
    } */
      
      
  }

  async audio( directory: string,urlAudio: string, idMessage: string) {
    const url = urlAudio;
      const path = Path.resolve(`${directory}/${idMessage}.mp3`);
      console.log(path);
      const writer = Fs.createWriteStream(path);
      
      const response = await axiosInstance({
        url
      })
    
      response.data.pipe(writer);
    
      return new Promise((resolve, reject) => {
        console.log(url)
        writer.on('finish', resolve)
        writer.on('error', reject)
      
      })
    
    /* try{ 
      const url = urlAudio;
      const path = Path.resolve(`${directory}/${idMessage}.mp3`);
      console.log(path);
      const writer = Fs.createWriteStream(path);
      
      const response = await Axios({
        url,
        method: "GET",
        responseType: "stream"
      })
    
      response.data.pipe(writer);
    
      return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
      
      })

    } catch(err: any) {
      console.log(directory)
      console.log(urlAudio)
      console.log(idMessage)
      //throw new InternalServerError(err)
    } */
    
    
  
  }

  async video( directory: string,urlVideo: string, idMessage: string) {
    const url = urlVideo;
      const path = Path.resolve(`${directory}/${idMessage}.mp4`);
      console.log(path);
      const writer = Fs.createWriteStream(path);
      
      const response = await axiosInstance({
        url
      })
    
      response.data.pipe(writer);
    
      return new Promise((resolve, reject) => {
        console.log(url)
        writer.on('finish', resolve)
        writer.on('error', reject)
      
      })
    
    /* try{
      const url = urlVideo;
      const path = Path.resolve(`${directory}/${idMessage}.mp4`);
      console.log(path);
      const writer = Fs.createWriteStream(path);
      
      const response = await Axios({
        url,
        method: "GET",
        responseType: "stream"
      })
    
      response.data.pipe(writer);
    
      return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
      
      })
 
    } catch(err: any) {
      console.log(directory)
      console.log(urlVideo)
      console.log(idMessage)
      //throw new InternalServerError(err)
    } */
     
  }

}

export { Download }