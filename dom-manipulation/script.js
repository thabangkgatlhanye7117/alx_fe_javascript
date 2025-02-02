// Array of quote object

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
};
