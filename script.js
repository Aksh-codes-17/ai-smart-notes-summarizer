function generateSummary() {

```
let text = document.getElementById("textInput").value;
let output = document.getElementById("output");

if (text.trim() === "") {
    alert("Please enter a paragraph");
    return;
}

output.innerHTML = "";

// Split sentences
let sentences = text.match(/[^\.!\?]+[\.!\?]+/g);

if (!sentences) {
    alert("Text is too short");
    return;
}

// Remove punctuation and convert to words
let words = text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);

// Common stop words
let stopWords = ["the","is","in","at","which","on","a","an","and","to","for","of","with","that","this","it","as","by","from"];

// Count word frequency
let freq = {};

words.forEach(word => {
    if (!stopWords.includes(word)) {
        freq[word] = (freq[word] || 0) + 1;
    }
});

// Score sentences
let sentenceScores = sentences.map(sentence => {

    let score = 0;
    let sentenceWords = sentence.toLowerCase().replace(/[^\w\s]/g,"").split(" ");

    sentenceWords.forEach(word => {
        if (freq[word]) {
            score += freq[word];
        }
    });

    return { sentence: sentence.trim(), score: score };

});

// Sort by importance
sentenceScores.sort((a,b)=> b.score - a.score);

// Take top 3 sentences
let summary = sentenceScores.slice(0,3);

summary.forEach(item => {

    let li = document.createElement("li");
    li.innerText = item.sentence;

    output.appendChild(li);

});
```

}
