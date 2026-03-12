from flask import Flask, render_template, request
import nltk
import PyPDF2
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from collections import defaultdict

nltk.download('punkt')
nltk.download('stopwords')

app = Flask(__name__)
def summarize(text):

    sentences = sent_tokenize(text)
    words = word_tokenize(text.lower())

    stop_words = set(stopwords.words("english"))

    freq = defaultdict(int)

    for word in words:
        if word not in stop_words:
            freq[word] += 1

    sentence_scores = {}

    for sentence in sentences:
        for word in word_tokenize(sentence.lower()):
            if word in freq:
                if sentence not in sentence_scores:
                    sentence_scores[sentence] = freq[word]
                else:
                    sentence_scores[sentence] += freq[word]

    summary_sentences = sorted(sentence_scores, key=sentence_scores.get, reverse=True)[:2]

    summary = " ".join(summary_sentences)

    return summary
def extract_pdf_text(pdf_file):

    reader = PyPDF2.PdfReader(pdf_file)
    text = ""

    for page in reader.pages:
        text += page.extract_text()

    return text
@app.route("/", methods=["GET", "POST"])
def index():

    summary = ""

    if request.method == "POST":

        text = request.form.get("notes")

        pdf = request.files.get("pdf_file")

        if pdf and pdf.filename != "":
            text = extract_pdf_text(pdf)

        if text:
            summary = summarize(text)

    return render_template("index.html", summary=summary)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
