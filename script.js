function summarizeText(){

let text = document.getElementById("inputText").value;

if(text.trim()===""){
alert("Please enter text");
return;
}

// split sentences
let sentences = text.split(/[.!?]+/);

// stop words
let stopWords = ["the","is","in","at","which","on","a","an","and","to","for","of","with","that","this","it"];

// clean text
let words = text.toLowerCase().replace(/[^\w\s]/g,"").split(" ");

let frequency = {};

// count keyword frequency
words.forEach(function(word){

if(!stopWords.includes(word)){

frequency[word] = (frequency[word] || 0) + 1;

}

});

// score sentences
let scores = [];

sentences.forEach(function(sentence){

let score = 0;

let sentenceWords = sentence.toLowerCase().split(" ");

sentenceWords.forEach(function(word){

if(frequency[word]){

score += frequency[word];

}

});

scores.push({sentence:sentence.trim(),score:score});

});

// sort sentences
scores.sort(function(a,b){

return b.score - a.score;

});

// take top 3 sentences
let important = scores.slice(0,3);

let output = document.getElementById("output");

output.innerHTML = "<h3>Key Points</h3>";

let ul = document.createElement("ul");

important.forEach(function(item){

let li = document.createElement("li");

li.innerText = item.sentence;

ul.appendChild(li);

});

output.appendChild(ul);

}
