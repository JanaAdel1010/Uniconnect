document.getElementById("foundForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("itemName").value.toLowerCase();
  const desc = document.getElementById("description").value.toLowerCase();

  // 1. Fetch lost items from your backend
  const response = await fetch("http://localhost:5000/api/lost");
  const lostItems = await response.json();

  // 2. Match logic
  const matches = lostItems.filter(item =>
    item.name.toLowerCase().includes(name) ||
    item.description.toLowerCase().includes(desc)
  );

  // 3. Store matched items and user input in localStorage
  localStorage.setItem("found_matches", JSON.stringify(matches));
  localStorage.setItem("userItem", JSON.stringify({ name, desc }));

  // 4. Redirect to results page
  window.location.href = "match-result.html";
});