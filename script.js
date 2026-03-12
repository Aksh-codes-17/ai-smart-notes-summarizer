function summarizeText(){

let text=document.getElementById("notes").value;

if(text.trim()===""){
alert("Please enter text");
return;
}

let stopWords=[
"the","is","in","at","which","on","a","an","and","are",
"to","for","of","with","that","this","it","as","by","from"
];

let sentences=text.match(/[^.!?]+[.!?]+/g);

let words=text.toLowerCase().replace(/[^\w\s]/g,"").split(" ");

let frequency={};

words.forEach(word=>{
if(!stopWords.includes(word)){
frequency[word]=(frequency[word]||0)+1;
}
});

let scores=[];

sentences.forEach(sentence=>{

let sentenceWords=sentence.toLowerCase().replace(/[^\w\s]/g,"").split(" ");

let score=0;

sentenceWords.forEach(word=>{
if(frequency[word]){
score+=frequency[word];
}
});

scores.push({sentence:sentence,score:score});

});

scores.sort((a,b)=>b.score-a.score);

let summaryLength=Math.max(3,Math.floor(sentences.length*0.3));

let topSentences=scores.slice(0,summaryLength);

let result=document.getElementById("result");

result.innerHTML="";

topSentences.forEach(item=>{
let li=document.createElement("li");
li.innerText=item.sentence;
result.appendChild(li);
});

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
