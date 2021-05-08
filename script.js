let lorem = 0;
let chart;
const SELECTOR = {
    lorem: 'lorem',
    paragraphs: '#paras',
    textContainer: '.text',
    countersContainer: '.counters',
    wordCounter: '.word-counter',
    charCounter: '.char-counter'
};

function checkedLorem() {
    const {checked:isLoremChecked} = document.getElementById(SELECTOR.lorem); 
    lorem = isLoremChecked ? 1 : 0;
}

/* function generate() {
    const paragraphs = document.querySelector(SELECTOR.paragraphs).value;
    fetch(`https://baconipsum.com/api/?type=all-meat&paras=${paragraphs}&start-with-lorem=${lorem}`)
        .then(response => response.json())
        .then(handleResponse)
        .catch(err => console.log(err.message));
} */

async function generate() {
    const paragraphs = document.querySelector(SELECTOR.paragraphs).value;
    const link = `https://baconipsum.com/api/?type=all-meat&paras=${paragraphs}&start-with-lorem=${lorem}`
    
    try {
        const response = await fetch(link);
        const data = await response.json();
        handleResponse(data);
    } catch (error) {
        console.error(error.message);
    }    
}


function handleResponse(text) {
    const textContainer = document.querySelector(SELECTOR.textContainer);

    textContainer.innerHTML = text;
    setCounterTexts(textContainer)
    countRepeatedWords(textContainer.textContent);
    sortWords(textContainer.textContent);
}

function setCounterTexts(textContainer){
    const counters = document.querySelector(SELECTOR.countersContainer);

    counters.querySelector(SELECTOR.wordCounter).innerHTML = `TOTAL WORDS: ${textContainer.textContent.split(' ').length}`;
    counters.querySelector(SELECTOR.charCounter).innerHTML = `TOTAL CHARACTERS: ${textContainer.textContent.length}`;
}

function countRepeatedWords(allText) {
    const text = allText.replaceAll(/[^\w\s]/gi, '').replaceAll('  ', ' ').toLowerCase();
    const words = text.split(" ");
    let wordMap = {};

    words.forEach(current => {
        let currentWordCount = wordMap[current];
        let count = currentWordCount ? currentWordCount : 0;
        wordMap[current] = count + 1;
    });

    const topThree = getTopThree(sortWords(wordMap), wordMap);

    renderChart(topThree);
}

function sortWords(wordMap) {
    return Object.keys(wordMap).sort((current, previous) => wordMap[previous] - wordMap[current])
}

function getTopThree(sortedWords, wordMap) {
    const ranking = sortedWords.slice(0, 3);
    return ranking.map(wordName => ([wordName, wordMap[wordName]]))
}

function renderChart(rows) {
    anychart.onDocumentReady(function () {
        const data = {
            header: ["Name", "Total"],
            rows
        };
        chart = chart || anychart.column()
        chart.data(data);
        chart.container("container");
        chart.draw();
    });
}

generate();
