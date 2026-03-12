function summarizeText(){

let text = document.getElementById("notes").value;

if(text.trim() === ""){
document.getElementById("result").innerText="Please enter some notes.";
return;
}

let sentences = text.split(".");

let summary = sentences.slice(0,2).join(".");

document.getElementById("result").innerText = summary;

}
