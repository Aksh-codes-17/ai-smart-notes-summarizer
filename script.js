const pdfInput = document.getElementById("pdfFile");
const textArea = document.getElementById("textInput");

pdfInput.addEventListener("change", function(){

let file = pdfInput.files[0];

if(file.type !== "application/pdf"){
alert("Please upload a PDF file");
return;
}

let reader = new FileReader();

reader.onload = function(){

let typedarray = new Uint8Array(this.result);

pdfjsLib.getDocument(typedarray).promise.then(function(pdf){

let text = "";

let pages = [];

for(let i=1;i<=pdf.numPages;i++){

pages.push(
pdf.getPage(i).then(function(page){

return page.getTextContent().then(function(content){

let strings = content.items.map(item => item.str);

text += strings.join(" ") + " ";

});

})
);

}

Promise.all(pages).then(function(){

textArea.value = text;

});

});

};

reader.readAsArrayBuffer(file);

});


function generateSummary(){

let text = textArea.value;

let output = document.getElementById("output");

output.innerHTML = "";

if(text.trim()==""){
alert("Enter text or upload PDF");
return;
}

let sentences = text.split(/[.!?]/).filter(s=>s.trim().length>20);

sentences.slice(0,5).forEach(sentence=>{

let words = sentence.trim().split(" ");

let shortNote = words.slice(0,8).join(" ") + "...";

let li = document.createElement("li");

li.innerText = shortNote;

output.appendChild(li);

});

}
