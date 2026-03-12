function summarizeText(){

let text=document.getElementById("notes").value;

if(text.trim()===""){
document.getElementById("result").innerText="Please enter some text.";
return;
}

let sentences=text.split(". ");
let words=text.toLowerCase().replace(/[^\w\s]/g,"").split(" ");

let frequency={};

words.forEach(word=>{
if(frequency[word]){
frequency[word]++;
}else{
frequency[word]=1;
}
});

let scores=[];

sentences.forEach(sentence=>{

let score=0;

let sentenceWords=sentence.toLowerCase().split(" ");

sentenceWords.forEach(word=>{
if(frequency[word]){
score+=frequency[word];
}
});

scores.push({sentence:sentence,score:score});

});

scores.sort((a,b)=>b.score-a.score);

let summary=scores.slice(0,3).map(item=>item.sentence).join(". ");

document.getElementById("result").innerText=summary;

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
