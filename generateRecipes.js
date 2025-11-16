// generateRecipes.js
const mysql = require("mysql2/promise");

// ---------- DATABASE CONNECTION ----------
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "sachimit2305@gm",
  database: "sustainable_food",
  waitForConnections: true,
  connectionLimit: 10,
});

// ---------- CONFIG ----------
const NUM_RECIPES = 1000; 
const BATCH_SIZE = 1000;     // insert 1000 recipes at a time

const diets = ["vegan", "vegetarian", "non-veg", "all"];
const ingredientsPool = [
  "broccoli","carrot","tomato","onion","potato","spinach","tofu","paneer",
  "rice","beans","chickpeas","cauliflower","cucumber","garlic","pasta",
  "eggs","fish","chicken","pumpkin","bell pepper","mushroom","corn","peas",
  "ginger","coconut","lemon","turmeric","cheese","cream","yogurt","cilantro"
];

const footprints = ["Low", "Medium", "High"];

// ---------- HELPER FUNCTION ----------
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomIngredients() {
  const num = getRandomInt(3, 7); // 3 to 7 ingredients
  const shuffled = ingredientsPool.sort(() => 0.5 - Math.random());
  return JSON.stringify(shuffled.slice(0, num));
}

// ---------- GENERATE RECIPES ----------
async function generate() {
  console.log("Starting recipe generation...");

  for (let i = 0; i < NUM_RECIPES; i += BATCH_SIZE) {
    const batch = [];
    for (let j = 0; j < BATCH_SIZE && i + j < NUM_RECIPES; j++) {
      const name = `Recipe_${i + j + 1}`;
      const diet = diets[getRandomInt(0, diets.length - 1)];
      const ingredients = getRandomIngredients();
      const footprint = footprints[getRandomInt(0, footprints.length - 1)];

      batch.push([name, diet, ingredients, footprint]);
    }

    try {
  const sql = "INSERT INTO recipes (name, diet, ingredients, footprint) VALUES ?";
  await db.query(sql, [batch]);  // <-- actually insert into DB
  console.log(`Inserted recipes ${i + 1} to ${i + batch.length}`);
} catch (err) {
  console.error("Error inserting batch:", err);
}

  }

  console.log("Recipe generation complete!");
  process.exit(0);
}

generate();
