function generateSummary() {
    let text = document.getElementById("textInput").value;
    let output = document.getElementById("output");

    if (text.trim() === "") {
        alert("Please enter a paragraph");
        return;
    }

    output.innerHTML = "";

    // 1. Split text into sentences and clean them up
    let sentences = text.split(/[.!?]/).filter(s => s.trim().length > 5);
    
    // 2. Define "Important" keywords to look for
    const keywords = ["essential", "priority", "important", "key", "innovation", "skills", "demand", "workflow"];

    // 3. Filter sentences that contain these keywords OR are the first/last sentence
    let summaryPoints = sentences.filter((sentence, index) => {
        const lowerSentence = sentence.toLowerCase();
        const hasKeyword = keywords.some(word => lowerSentence.includes(word));
        return index === 0 || hasKeyword; // Keep the 1st sentence + sentences with keywords
    });

    // 4. Limit to a maximum of 3 points for brevity
    summaryPoints.slice(0, 3).forEach(point => {
        let li = document.createElement("li");
        li.innerText = point.trim() + ".";
        output.appendChild(li);
    });
}
