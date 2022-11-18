import fs from 'fs';

class Directory {
  async createDir (folder: string){
    try{
      fs.mkdirSync(folder);
    }catch(err){
      return console.log(err);
    }
  }

  async verifyDir(folder:string){
    return fs.existsSync(folder);
  }

}

export { Directory }