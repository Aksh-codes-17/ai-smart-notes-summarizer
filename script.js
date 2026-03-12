// 1. Point to the worker (CRITICAL: PDF.js cannot run without this)
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

// PDF READER
document.getElementById("pdfUpload").addEventListener("change", async function(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Show a loading state in the textarea
    const textInput = document.getElementById("textInput");
    textInput.value = "Reading PDF... please wait...";

    const reader = new FileReader();
    reader.onload = async function() {
        try {
            const typedarray = new Uint8Array(this.result);
            
            // Load the PDF document
            const pdf = await pdfjsLib.getDocument({data: typedarray}).promise;
            let fullText = "";

            // Loop through every page
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                
                // Extract strings and join them
                const strings = content.items.map(item => item.str);
                fullText += strings.join(" ") + "\n\n";
            }

            // Push the final text to the textarea
            textInput.value = fullText.trim();
            
            if (fullText.trim() === "") {
                alert("This PDF seems to be scanned (an image) or empty. No text could be extracted.");
            }

        } catch (err) {
            console.error("PDF Error: ", err);
            alert("Error processing PDF. Try a different file.");
            textInput.value = "";
        }
    };
    
    reader.readAsArrayBuffer(file);
});

// SUMMARY FUNCTION (Keep this as is)
function generateSummary() {
    let text = document.getElementById("textInput").value;
    let output = document.getElementById("output");
    output.innerHTML = "";

    if (text.trim() === "" || text.includes("Reading PDF...")) {
        alert("Please wait for the PDF to load or enter text.");
        return;
    }

    // Split into sentences and filter out tiny fragments
    let sentences = text.split(/[.!?]/).map(s => s.trim()).filter(s => s.length > 20);
    
    // Take up to 5 sentences
    let summaryList = sentences.slice(0, 5);

    summaryList.forEach(sentence => {
        let li = document.createElement("li");
        li.innerText = sentence + ".";
        output.appendChild(li);
    });
}
