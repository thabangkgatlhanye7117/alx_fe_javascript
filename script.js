

let quotes = [];

function displayQuote(quote) {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.textContent = `"${quote.text}" - ${quote.category}`;
}

function showRandomQuote() {
  if (quotes.length === 0) {
    alert("No quotes available");
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  displayQuote(quotes[randomIndex]);
}

function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = {
      text: newQuoteText,
      category: newQuoteCategory
    };

    quotes.push(newQuote);
    saveQuotes(); // Save to local storage after adding a quote
    displayQuote(newQuote);
  } else {
    alert("Both fields are required.");
  }
}

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Load quotes from local storage on page load
function loadQuotes() {
  const savedQuotes = localStorage.getItem('quotes');
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
  }
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);
window.onload = loadQuotes;


function exportQuotes() {
  const jsonStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const categories = Array.from(new Set(quotes.map(quote => quote.category)));
  
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const filteredQuotes = selectedCategory === 'all' 
    ? quotes 
    : quotes.filter(quote => quote.category === selectedCategory);

  // Display filtered quotes
  if (filteredQuotes.length > 0) {
    displayQuote(filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)]);
  } else {
    alert("No quotes available in this category.");
  }
}
function saveLastCategory() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('lastCategory', selectedCategory);
}
localStorage.setItem('lastCategory', selectedCategory);

function loadLastCategory() {
  const lastCategory = localStorage.getItem('lastCategory');
  if (lastCategory) {
    document.getElementById('categoryFilter').value = lastCategory;
    filterQuotes();
  }
}

document.getElementById('categoryFilter').addEventListener('change', saveLastCategory);
window.onload = function() {
  loadQuotes();
  populateCategories();
  loadLastCategory();
};
setInterval(() => {
  fetch('https://jsonplaceholder.typicode.com/posts')  // Simulate server call
    .then(response => response.json())
    .then(serverQuotes => {
      const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
      
    });
}, 5000);

