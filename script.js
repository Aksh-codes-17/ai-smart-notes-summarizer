function summarizeText(){

let text = document.getElementById("notes").value;

let sentences = text.split(".");

let summary = sentences.slice(0,2).join(".");

document.getElementById("result").innerText = summary;

}
