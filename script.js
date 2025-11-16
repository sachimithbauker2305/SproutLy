// ---------------- CHECK LOGIN ----------------
const savedUser = JSON.parse(localStorage.getItem("loggedInUser")); // use the same key as login
if (!savedUser) {
  window.location.href = "login.html"; // redirect if not logged in
}

// ---------------- LOGOUT FUNCTION ----------------
function logout() {
  localStorage.removeItem("loggedInUser"); // remove the correct key
  alert("You have logged out!");
  window.location.href = "login.html";
}

// ---------------- SIGN UP ----------------
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Sign up successful! You can now login.");
    localStorage.setItem("user", JSON.stringify(storedUser)); 
window.location.href = "home.html";

  });
}

// ---------------- LOGIN ----------------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert("Login successful! Welcome, " + storedUser.name + " 🌿");
      window.location.href = "home.html";
    } else {
      alert("Incorrect email or password!");
    }
  });
}

// ---------------- RECIPE FINDER ----------------
const recipeForm = document.getElementById("recipeForm");
if (recipeForm) {
  recipeForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const ingredientsInput = document.getElementById("ingredients").value.trim();
    const diet = document.getElementById("diet").value;
    const resultsContainer = document.getElementById("recipeResults");
    resultsContainer.innerHTML = '';

    if (!ingredientsInput) {
      resultsContainer.innerHTML = '<p>Please enter some ingredients!</p>';
      return;
    }

    const ingredients = ingredientsInput.split(',').map(i => i.trim().toLowerCase());

   const recipesDB = [
  // 🌱 VEGAN RECIPES
  { name: 'Chana Masala', diet: 'vegan', ingredients: ['chickpeas','onion','tomato','garlic','spices'], calories: 250 },
  { name: 'Aloo Gobi', diet: 'vegan', ingredients: ['potato','cauliflower','tomato','spices'], calories: 220 },
  { name: 'Baingan Bharta', diet: 'vegan', ingredients: ['eggplant','tomato','onion','spices'], calories: 180 },
  { name: 'Masoor Dal', diet: 'vegan', ingredients: ['red lentils','onion','tomato','garlic','spices'], calories: 200 },
  { name: 'Palak Tofu Curry', diet: 'vegan', ingredients: ['spinach','tofu','garlic','tomato','spices'], calories: 210 },
  { name: 'Vegetable Sambar', diet: 'vegan', ingredients: ['lentils','carrot','beans','tamarind','spices'], calories: 190 },
  { name: 'Pumpkin Soup', diet: 'vegan', ingredients: ['pumpkin','onion','garlic','spices'], calories: 160 },
  { name: 'Cabbage Stir Fry', diet: 'vegan', ingredients: ['cabbage','carrot','green chili','spices'], calories: 150 },
  { name: 'Quinoa Vegetable Pulao', diet: 'vegan', ingredients: ['quinoa','peas','carrot','beans','spices'], calories: 230 },
  { name: 'Lentil Salad', diet: 'vegan', ingredients: ['moong dal','cucumber','tomato','lemon','cilantro'], calories: 180 },
  { name: 'Oats Upma', diet: 'vegan', ingredients: ['oats','carrot','peas','onion','spices'], calories: 200 },
  { name: 'Sweet Potato Chaat', diet: 'vegan', ingredients: ['sweet potato','lemon','chili','mint'], calories: 170 },
  { name: 'Vegan Buddha Bowl', diet: 'vegan', ingredients: ['quinoa','chickpeas','spinach','avocado','tomato'], calories: 240 },
  { name: 'Green Moong Curry', diet: 'vegan', ingredients: ['green moong','onion','tomato','spices'], calories: 210 },
  { name: 'Zucchini Stir Fry', diet: 'vegan', ingredients: ['zucchini','onion','garlic','spices'], calories: 160 },
  { name: 'Broccoli Almond Soup', diet: 'vegan', ingredients: ['broccoli','almonds','garlic','onion'], calories: 180 },
  { name: 'Vegan Thai Curry', diet: 'vegan', ingredients: ['tofu','coconut milk','basil','mushroom','bell pepper'], calories: 260 },

  // 🧀 VEGETARIAN RECIPES
  { name: 'Palak Paneer', diet: 'vegetarian', ingredients: ['spinach','paneer','cream','spices'], calories: 280 },
  { name: 'Paneer Butter Masala', diet: 'vegetarian', ingredients: ['paneer','tomato','butter','cream','spices'], calories: 320 },
  { name: 'Matar Paneer', diet: 'vegetarian', ingredients: ['paneer','peas','tomato','spices'], calories: 270 },
  { name: 'Paneer Bhurji', diet: 'vegetarian', ingredients: ['paneer','onion','tomato','spices'], calories: 250 },
  { name: 'Paneer Tikka', diet: 'vegetarian', ingredients: ['paneer','yogurt','spices','lemon'], calories: 260 },
  { name: 'Kadai Paneer', diet: 'vegetarian', ingredients: ['paneer','capsicum','tomato','spices'], calories: 280 },
  { name: 'Shahi Paneer', diet: 'vegetarian', ingredients: ['paneer','cream','cashew','tomato','spices'], calories: 320 },
  { name: 'Paneer Veg Roll', diet: 'vegetarian', ingredients: ['paneer','tortilla','onion','lettuce','yogurt sauce'], calories: 240 },
  { name: 'Vegetable Biryani', diet: 'vegetarian', ingredients: ['basmati rice','carrot','peas','beans','spices'], calories: 260 },
  { name: 'Vegetable Stew', diet: 'vegetarian', ingredients: ['carrot','beans','peas','coconut milk','spices'], calories: 230 },
  { name: 'Vegetable Sandwich', diet: 'vegetarian', ingredients: ['bread','lettuce','tomato','cucumber','cheese'], calories: 190 },
  { name: 'Vegetable Pulao', diet: 'vegetarian', ingredients: ['rice','carrot','peas','beans','spices'], calories: 250 },
  { name: 'Methi Thepla', diet: 'vegetarian', ingredients: ['wheat flour','fenugreek leaves','spices'], calories: 200 },
  { name: 'Rajma Curry', diet: 'vegetarian', ingredients: ['kidney beans','tomato','onion','garlic','spices'], calories: 270 },
  { name: 'Poha with Vegetables', diet: 'vegetarian', ingredients: ['flattened rice','onion','peas','spices'], calories: 190 },
  { name: 'Vegetable Dhokla', diet: 'vegetarian', ingredients: ['gram flour','carrot','peas','spices'], calories: 190 },
  { name: 'Cucumber Raita', diet: 'vegetarian', ingredients: ['yogurt','cucumber','spices'], calories: 100 },
  { name: 'Mushroom Masala', diet: 'vegetarian', ingredients: ['mushroom','onion','tomato','spices'], calories: 230 },
  { name: 'Mushroom Matar', diet: 'vegetarian', ingredients: ['mushroom','peas','onion','spices'], calories: 220 },
  { name: 'Mushroom Paneer Curry', diet: 'vegetarian', ingredients: ['mushroom','paneer','tomato','spices'], calories: 280 },
  { name: 'Mushroom Fried Rice', diet: 'vegetarian', ingredients: ['mushroom','rice','carrot','soy sauce'], calories: 250 },
  { name: 'Paneer Mushroom Stir Fry', diet: 'vegetarian', ingredients: ['paneer','mushroom','onion','bell pepper','spices'], calories: 260 },
  { name: 'Mushroom Omelette (Eggless)', diet: 'vegetarian', ingredients: ['gram flour','mushroom','onion','spices'], calories: 190 },
  { name: 'Mushroom Soup', diet: 'vegetarian', ingredients: ['mushroom','milk','garlic','pepper'], calories: 200 },
  { name: 'Paneer Veg Skillet', diet: 'vegetarian', ingredients: ['paneer','bell pepper','broccoli','spices'], calories: 230 },

  // 🍗 NON-VEG (LEAN & HEALTHY)
  { name: 'Tandoori Chicken', diet: 'non-veg', ingredients: ['chicken','yogurt','ginger','garlic','spices'], calories: 300 },
  { name: 'Grilled Fish with Lemon', diet: 'non-veg', ingredients: ['fish','lemon','ginger','spices'], calories: 250 },
  { name: 'Fish Curry (Coconut Milk)', diet: 'non-veg', ingredients: ['fish','coconut milk','onion','tomato','spices'], calories: 270 },
  { name: 'Fish Tikka', diet: 'non-veg', ingredients: ['fish','yogurt','spices','lemon'], calories: 240 },
  { name: 'Baked Salmon with Herbs', diet: 'non-veg', ingredients: ['salmon','olive oil','lemon','dill'], calories: 280 },
  { name: 'Tuna Salad Bowl', diet: 'non-veg', ingredients: ['tuna','lettuce','tomato','lemon','cucumber'], calories: 180 },
  { name: 'Chicken Saag', diet: 'non-veg', ingredients: ['chicken','spinach','onion','garlic','spices'], calories: 280 },
  { name: 'Egg Bhurji with Vegetables', diet: 'non-veg', ingredients: ['eggs','onion','tomato','spices'], calories: 220 },
  { name: 'Prawn Curry (Healthy)', diet: 'non-veg', ingredients: ['prawns','tomato','onion','spices','coconut milk'], calories: 260 },
  { name: 'Chicken Shorba', diet: 'non-veg', ingredients: ['chicken','onion','garlic','spices'], calories: 200 },
  { name: 'Egg & Spinach Stir Fry', diet: 'non-veg', ingredients: ['eggs','spinach','onion','spices'], calories: 210 },
  { name: 'Shrimp Masala', diet: 'non-veg', ingredients: ['shrimp','tomato','onion','spices','ginger'], calories: 250 },
  { name: 'Chicken Salad Bowl', diet: 'non-veg', ingredients: ['chicken','lettuce','cucumber','tomato','lemon'], calories: 180 },
  { name: 'Grilled Chicken Wrap', diet: 'non-veg', ingredients: ['chicken','tortilla','lettuce','yogurt sauce'], calories: 230 },
  { name: 'Egg Curry (Light)', diet: 'non-veg', ingredients: ['eggs','tomato','onion','spices'], calories: 220 },
  { name: 'Chicken Veg Soup', diet: 'non-veg', ingredients: ['chicken','carrot','beans','spices'], calories: 160 },
  { name: 'Grilled Prawn Skewers', diet: 'non-veg', ingredients: ['prawns','lemon','garlic','spices'], calories: 190 },
  { name: 'Fish and Spinach Stew', diet: 'non-veg', ingredients: ['fish','spinach','tomato','garlic'], calories: 230 },
  { name: 'Chicken Mushroom Stir Fry', diet: 'non-veg', ingredients: ['chicken','mushroom','bell pepper','soy sauce'], calories: 250 },
  { name: 'Garlic Butter Fish Fillet', diet: 'non-veg', ingredients: ['fish','butter','garlic','lemon'], calories: 260 },
  { name: 'Egg Fried Rice (Healthy)', diet: 'non-veg', ingredients: ['egg','brown rice','peas','carrot','soy sauce'], calories: 240 },
  { name: 'Tuna Sandwich', diet: 'non-veg', ingredients: ['tuna','bread','lettuce','yogurt'], calories: 200 }
];

    // ---------- FOOD FOOTPRINT CALCULATOR ----------
    function calculateFootprint(recipe) {
      let score = 0;
      if (recipe.diet === 'vegan') score += 1;
      else if (recipe.diet === 'vegetarian') score += 2;
      else if (recipe.diet === 'non-veg') score += 3;

      score += recipe.ingredients.length * 0.4;

      if (score <= 3) return 'Low Calory Food';
      else if (score <= 5) return 'Medium Calory Food';
      else return 'High Calory Food';
    }

    // ---------- FILTER RECIPES ----------
    const filteredRecipes = recipesDB.filter(recipe => {
      const dietMatch = diet === 'all' || recipe.diet === diet;
      const ingredientMatch = ingredients.some(inputIng =>
        recipe.ingredients.some(recIng => recIng.toLowerCase().includes(inputIng))
      );
      return dietMatch && ingredientMatch;
    });

    if (filteredRecipes.length === 0) {
      resultsContainer.innerHTML = '<p>No recipes found with these ingredients and diet type.</p>';
      return;
    }

    // ---------- DISPLAY RESULTS ----------
    filteredRecipes.forEach(recipe => {
      const div = document.createElement('div');
      div.className = 'recipe-card';
      div.innerHTML = `
        <h3>${recipe.name}</h3>
        <p><strong>Diet:</strong> ${recipe.diet}</p>
        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
        <p><strong>Eco-Footprint:</strong> ${calculateFootprint(recipe)}</p>
      `;
      resultsContainer.appendChild(div);
    });
  });
}
