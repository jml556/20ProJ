const quoteContainer = document.querySelector('#quote-container')
const quoteText = document.querySelector('#quote')
const authorText = document.querySelector('#author')
const twitterBtn = document.querySelector('#twitter')
const newQuoteBtn = document.querySelector('#new-quote')
const loader = document.querySelector('#loader')

// Get Quotes from API 
let apiQuotes = []

loading()

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    authorText.textContent = quote.author
    if (!quote.author) {
        authorText.textContent = 'Unkown'
    } else {
        authorText.textContent = quote.author
    }
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote')
    } 
    quoteText.textContent = quote.text
}

async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const res = await fetch(apiUrl);
        apiQuotes = await res.json()
        newQuote()
    }
    catch(error) {
        console.error(error)
    }
}

//Tweet Quotes 
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes()