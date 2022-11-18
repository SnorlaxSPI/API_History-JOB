import moment from 'moment-timezone';

class ConvertDateHour {
  
  dateComplete(dateHour: any) {
    let dateConverted = moment(dateHour).tz('America/Sao_Paulo').format("DD/MM/YYYY HH:mm:ss");
    return dateConverted;
  }

  date(dateHour: any) {
    let dateConverted = moment(dateHour).tz('America/Sao_Paulo').format("DD/MM/YYYY");
    return dateConverted;
  }

  dateHyphen(dateHour: any){
    let dateConverted = moment(dateHour).tz('America/Sao_Paulo').format("DD-MM-YYYY");
    return dateConverted; 
  }

  dateDay(dateHour: any){
    let dateConverted  = moment(dateHour).tz('America/Sao_Paulo').format("D");
    return dateConverted;
  }

  dateMonth(dateHour: any){
    let dateConverted  = moment(dateHour).tz('America/Sao_Paulo').format("MMMM");
    return dateConverted;
  }

  dateYear(dateHour: any){
    let dateConverted  = moment(dateHour).tz('America/Sao_Paulo').format("YYYY");
    return dateConverted;
  }

  
  hour(dateHour: any) {
    let dateConverted = moment(dateHour).tz('America/Sao_Paulo').format("HH:mm:ss");
    return dateConverted;
  }
  
}

export {ConvertDateHour}