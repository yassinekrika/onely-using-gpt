// app.js

// Function to fetch recipe details from the Spoonacular API
async function fetchRecipeDetails(recipeId) {
    try {
      // Replace 'YOUR_API_KEY' with your actual Spoonacular API key
      const apiKey = 'a7d46bb9653048019075c1b8ef2999f9';
      const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
      const response = await fetch(apiUrl);
      const recipe = await response.json();
      return recipe;
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  }
  
  // Function to populate the recipe detail page with fetched recipe data
  function populateRecipeDetail(recipe) {
    // Get HTML elements to populate with recipe details
    const recipeImage = document.querySelector('.recipe-image');
    const recipeTitle = document.querySelector('.recipe-title');
    const recipeIngredients = document.querySelector('.recipe-ingredients');
    const recipeInstructions = document.querySelector('.recipe-instructions');
  
    // Populate recipe details into HTML elements
    recipeImage.src = recipe.image;
    recipeTitle.textContent = recipe.title;
    recipeIngredients.innerHTML = recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('');
    recipeInstructions.innerHTML = recipe.analyzedInstructions[0].steps.map(step => `<li>Step ${step.number}: ${step.step}</li>`).join('');
  }
  
  // Get the recipe ID from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('id');
  
  // Fetch recipe details and populate the page with the data
  fetchRecipeDetails(recipeId)
    .then(recipe => {
      populateRecipeDetail(recipe);
    })
    .catch(error => {
      console.error('Error fetching recipe details:', error);
    });
  