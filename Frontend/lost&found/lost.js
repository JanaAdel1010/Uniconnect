document.getElementById("lostForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form); // Collects name, description, phone, image

  // 1. Submit lost item to backend
  await fetch("http://localhost:5000/api/lost", {
    method: "POST",
    body: formData
  });

  // 2. Extract for matching
  const name = formData.get("name").toLowerCase();
  const desc = formData.get("description").toLowerCase();

  // 3. Fetch all found items
  const response = await fetch("http://localhost:5000/api/found");
  const foundItems = await response.json();

  // 4. Match logic
  const matches = foundItems.filter(item =>
    item.name.toLowerCase().includes(name) ||
    item.description.toLowerCase().includes(desc)
  );

  // 5. Store match results
  localStorage.setItem("lost_matches", JSON.stringify(matches));
  localStorage.setItem("userItem", JSON.stringify({ name, desc }));

  // 6. Redirect to results page
  window.location.href = "match-result.html";
});
