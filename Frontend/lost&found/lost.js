document.getElementById("lostForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("itemName").value.toLowerCase();
  const desc = document.getElementById("description").value.toLowerCase();

  // Fetch all found items from backend
  const response = await fetch("http://localhost:5000/api/found");
  const foundItems = await response.json();

  // Match logic: compare user input with found items
  const matches = foundItems.filter(item =>
    item.name.toLowerCase().includes(name) ||
    item.description.toLowerCase().includes(desc)
  );

  // Save to localStorage for match-result page
  localStorage.setItem("lost_matches", JSON.stringify(matches));
  localStorage.setItem("userItem", JSON.stringify({ name, desc }));

  // Redirect to match result page
  window.location.href = "match-result.html";
});