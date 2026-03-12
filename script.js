function generateNotes(){

let text=document.getElementById("notes").value;

if(text.trim()===""){
alert("Please enter text");
return;
}

let sentences=text.split(". ");

let result=document.getElementById("result");

result.innerHTML="";

let title=document.createElement("h3");
title.innerText="Key Points";
result.appendChild(title);

let ul=document.createElement("ul");

sentences.forEach(sentence=>{

if(sentence.length>40){

let li=document.createElement("li");

li.innerText=sentence.trim();

ul.appendChild(li);

}

});

result.appendChild(ul);

}

function loadPDF(){

let file=document.getElementById("pdfFile").files[0];

if(!file){
alert("Upload a PDF file");
return;
}

let reader=new FileReader();

reader.onload=function(){

let typedarray=new Uint8Array(this.result);

pdfjsLib.getDocument(typedarray).promise.then(function(pdf){

let text="";

let pages=[];

for(let i=1;i<=pdf.numPages;i++){

pages.push(
pdf.getPage(i).then(function(page){

return page.getTextContent().then(function(content){

content.items.forEach(item=>{
text+=item.str+" ";
});

});

})
);

}

Promise.all(pages).then(function(){

document.getElementById("notes").value=text;

});

});

};

reader.readAsArrayBuffer(file);

}
