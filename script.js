/*// Array of quote object

 const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivational" },
  { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Inspirational" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
];

// Function to display a random quote
const quoteBtn = document.getElementById('new-quote')
quoteBtn.addEventListener(click, function showRandomQuote() {
  // Get a random index
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  
  // Select the DOM element to display the quote
  const quoteDisplay = document.getElementById('quote-display');
  
  // Display the quote text and category
  quoteDisplay.innerHTML = `<p> Quote : "${randomQuote.text}"</p> <p><em>Category: ${randomQuote.category}</em></p>`;
} )


// Function to create and display the form for adding a new quote
function createAddQuoteForm() {
  const formContainer = document.getElementById('add-quote-form-container');
  
  // Clear previous content if any
  formContainer.innerHTML = '';
  
  // Create form elements
  const form = document.createElement('form');
  form.id = 'quote-form';
  
  // Create input fields for text and category
  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.id = 'quote-text';
  textInput.placeholder = 'Enter quote text';
  textInput.required = true;

  const categoryInput = document.createElement('input');
  categoryInput.type = 'text';
  categoryInput.id = 'quote-category';
  categoryInput.placeholder = 'Enter quote category';
  categoryInput.required = true;

  // Create submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.innerHTML = 'Add Quote';
  
  // Append inputs and button to the form
  form.appendChild(textInput);
  form.appendChild(categoryInput);
  form.appendChild(submitButton);
  
  // Append form to the container
  formContainer.appendChild(form);
  
  // Add event listener for form submission
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Get the values from the input fields
    const newQuoteText = textInput.value;
    const newQuoteCategory = categoryInput.value;
    
    // Create new quote object and add to the quotes array
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    
    // Clear the input fields
    textInput.value = '';
    categoryInput.value = '';
    
    // Notify user that the quote was added
    alert('New quote added successfully!');
  });
}

// Initial setup: Show a random quote on page load
window.onload = function () {
  showRandomQuote();
  createAddQuoteForm();
};*/

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

