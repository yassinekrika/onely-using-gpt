// Get references to DOM elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsSection = document.getElementById('results-section');

// Event listener for form submit
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const apiKey = 'a7d46bb9653048019075c1b8ef2999f9'; // Replace with your actual Spoonacular API key
  // Get search query from input
  const query = searchInput.value.trim();

  if (query === '') {
    // Display error message if search input is empty
    resultsSection.innerHTML = '<p>Please enter a search query</p>';
  } else {
    // Fetch recipes from Spoonacular API
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`);
    const data = await response.json();
    if (data.results.length === 0) {
      // Display error message if no results found
      resultsSection.innerHTML = '<p>No results found. Please try again.</p>';
    } else {
      // Generate recipe cards for each result
      const recipeCards = data.results.map(recipe => `
        <div class="recipe-card">
          <img src="${recipe.image}" alt="${recipe.title}">
          <div class="recipe-details">
            <h2>${recipe.title}</h2>
            <p>Ready in ${recipe.readyInMinutes} minutes</p>
            <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
          </div>
        </div>
      `).join('');

      // Render recipe cards to results section
      resultsSection.innerHTML = recipeCards;
    }
  }
  const recipeCards = data.results.map(recipe => `
  <div class="recipe-card">
    <img src="${recipe.image}" alt="${recipe.title}">
    <div class="recipe-details">
      <h2>${recipe.title}</h2>
      <p>Ready in ${recipe.readyInMinutes} minutes</p>
      <a href="${recipe.id}" target="_blank">View Recipe</a> <!-- Add View Recipe button with source URL as link -->
    </div>
  </div>
`).join('');

resultsSection.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') { // Check if clicked element is an anchor element
    event.preventDefault(); // Prevent default link behavior
    const recipeUrl = event.target.href; // Get recipe URL from clicked link
    window.open(recipeUrl, '_blank'); // Open recipe URL in a new tab
  }
});
});
