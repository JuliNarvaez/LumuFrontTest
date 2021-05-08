# How to run

You can clone the repo and open the HTML in a viewer such as liveserver or click [here](https://juliannarvaez.com/Word-Counter/) to open in the browser.

### How it works:

Choose how many paragraphs do you want to get, check if u want lorem ipsum at start and click generate. It will show the three most repeated words in a bar chart.

## Q&A:

- The main complexity was count every repeated word depending of the response from the api and get the top three. 

### How was made:

I created an array map of 'keys:values' that can raise size depending of how much words the api returns, where the name of the word is the key and the value is how many times is repeated. Then these three values are displayed on a bar chart ordered from highest to lowest.