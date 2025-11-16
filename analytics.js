// ---------------- CHECK LOGIN ----------------
const savedUser = JSON.parse(localStorage.getItem("user"));
if (!savedUser) {
  window.location.href = "login.html";
}

// ---------------- LOGOUT FUNCTION ----------------
function logout() {
  localStorage.removeItem("user");
  alert("You have logged out!");
  window.location.href = "login.html";
}

// -------------- FETCH DATA FROM SERVER -----------------
async function fetchData(endpoint) {
  try {
    const res = await fetch(`http://localhost:5000/${endpoint}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
}

// ---------------- CHARTS -----------------
async function renderCharts() {
  // 1️⃣ Users Signup Count
  const usersData = await fetchData('analytics/users'); // you will create endpoint in server.js
  const usersChart = new Chart(document.getElementById('usersChart'), {
    type: 'bar',
    data: {
      labels: usersData.map(u => u.month),
      datasets: [{
        label: 'New Users',
        data: usersData.map(u => u.count),
        backgroundColor: 'rgba(46,125,50,0.6)',
        borderColor: 'rgba(46,125,50,1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });

  // 2️⃣ Recipes per Diet Type
  const recipesData = await fetchData('analytics/recipes'); 
  const recipesChart = new Chart(document.getElementById('recipesChart'), {
    type: 'pie',
    data: {
      labels: recipesData.map(r => r.diet),
      datasets: [{
        label: 'Recipes Count',
        data: recipesData.map(r => r.count),
        backgroundColor: [
          'rgba(102, 187, 106, 0.6)',
          'rgba(76, 175, 80, 0.6)',
          'rgba(56, 142, 60, 0.6)'
        ],
        borderColor: [
          'rgba(102, 187, 106, 1)',
          'rgba(76, 175, 80, 1)',
          'rgba(56, 142, 60, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: { responsive: true }
  });

  // 3️⃣ Most Popular Ingredients
  const ingredientsData = await fetchData('analytics/ingredients');
  const ingredientsChart = new Chart(document.getElementById('ingredientsChart'), {
    type: 'bar',
    data: {
      labels: ingredientsData.map(i => i.ingredient),
      datasets: [{
        label: 'Usage Count',
        data: ingredientsData.map(i => i.count),
        backgroundColor: 'rgba(46,125,50,0.6)',
        borderColor: 'rgba(46,125,50,1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: { x: { beginAtZero: true } }
    }
  });
}

renderCharts();
