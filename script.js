var lorem = 0;
generate();

function checkedLorem() {
    document.getElementById('lorem').checked ? lorem = 1 : lorem = 0;
}

function generate() {
    let paras = document.querySelector('#paras').value;
    fetch(`https://baconipsum.com/api/?type=all-meat&paras=${paras}&start-with-lorem=${lorem}`)
        .then(response => response.json())
        .then(printText)
        .catch(err => console.log(err.message));
}

function printText(text) {
    const textCont = document.querySelector('.text');
    textCont.innerHTML = text;
    document.querySelector('.word-counter').innerHTML = `TOTAL WORDS: ${textCont.textContent.split(' ').length}`;
    document.querySelector('.char-counter').innerHTML = `TOTAL CHARACTERS: ${textCont.textContent.length}`;
    countRepeatedWords(textCont.textContent);
    sortWords(textCont.textContent);
}

function countRepeatedWords(allText) {
    let text = allText.toLowerCase().replaceAll('.', '').replaceAll(',', '').replaceAll('  ', ' ');
    let words = text.split(" ");
    let wordMap = {};

    for (let i = 0; i < words.length; i++) {
        let currentWordCount = wordMap[words[i]];
        let count = currentWordCount ? currentWordCount : 0;
        wordMap[words[i]] = count + 1;
    }
    console.log(wordMap);
    showFirstThree(sortWords(wordMap));
}

function sortWords(wordMap) {
    const keysSorted = Object.keys(wordMap).sort(function (a, b) {
        return wordMap[b] - wordMap[a]
    })
    return keysSorted;
}

function showFirstThree(sortedWords) {
    const ranking = sortedWords.slice(0, 3);
    console.log(ranking);
}