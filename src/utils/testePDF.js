import convert from "html-pdf"

const CreatePdfByHtml = (messageEmail, dir)=>{
  let options = { format: 'Letter'}
  let file2 = messageEmail
  .replace(/\\r/g, "")
  .replace(/\\n/g, "")
  .replace(/\\t/g, "")

  convert.create(file2).toFile('../temp/teste.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); 
  });

}

CreatePdfByHtml();