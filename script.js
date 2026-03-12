function generateSummary(){

let text = document.getElementById("textInput").value;

if(text.trim() === ""){
alert("Please enter a paragraph");
return;
}

let sentences = text.split(".");

let output = document.getElementById("output");

output.innerHTML = "";

let count = Math.ceil(sentences.length * 0.4);

for(let i=0; i<count; i++){

if(sentences[i].trim() !== ""){

let li = document.createElement("li");

li.innerText = sentences[i].trim();

output.appendChild(li);

}

}

}
