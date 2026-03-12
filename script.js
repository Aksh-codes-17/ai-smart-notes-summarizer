function generateSummary(){

let text=document.getElementById("textInput").value;
let output=document.getElementById("output");

output.innerHTML="";

if(text.trim()==""){
alert("Enter a paragraph");
return;
}

// split sentences
let sentences=text.split(/[.!?]/).filter(s=>s.trim().length>0);

// convert to short notes
sentences.forEach(sentence=>{

let words=sentence.trim().split(" ");

// make short sentence
let short=words.slice(0,6).join(" ")+"...";

let li=document.createElement("li");

li.innerText=short;

output.appendChild(li);

});

}
