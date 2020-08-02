const container = document.getElementById('container');
const text = document.getElementById('text');
const author = document.getElementById('author');
const tweetBtn = document.getElementById('tweet');
const newBtn = document.getElementById('new');
const loader = document.getElementById('loading');

function loading() {
    loader.hidden = false;
    container.hidden = true;
}

function complete() {
    if (!loader.hidden) {
        container.hidden = false;
        loader.hidden = true;
    }
}


//generates quotes
async function newQuote() {
    loading();
    const proxyUrl= 'https://cors-anywhere.herokuapp.com/';
    const apiUrl= 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
    try{ 
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        //check author present or not
        if(data.quoteAuthor === ''){
            author.innerText = '- Anonymous';
        } else {
            author.innerText ='-'+ data.quoteAuthor;
        }

        //long quote check
        if(data.quoteText.length > 120) {
            text.classList.add('long-quote');
        } else {
            text.classList.remove('long-quote');
        }
        text.innerText = data.quoteText;

        complete();
    }
    catch (err) {
        newQuote();
    }
}

//tweet quote
function tweetQuote() {
    const quote = text.innerText;
    const authorT = author.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${authorT}`;
    window.open(twitterUrl, '_blank');
}

//event listeners
tweetBtn.addEventListener('click',tweetQuote);
newBtn.addEventListener('click',newQuote);


//on page load
newQuote();