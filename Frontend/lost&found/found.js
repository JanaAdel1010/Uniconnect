document.getElementById("foundForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form); // gathers name, description, phone, and image

  // 1. Send found item to backend
  await fetch("http://localhost:5000/api/found", {
    method: "POST",
    body: formData
  });

  // 2. Extract name and description for matching
  const name = formData.get("name").toLowerCase();
  const desc = formData.get("description").toLowerCase();

  // 3. Fetch lost items from backend
  const response = await fetch("http://localhost:5000/api/lost");
  const lostItems = await response.json();

  // 4. Match logic
  const matches = lostItems.filter(item =>
    item.name.toLowerCase().includes(name) ||
    item.description.toLowerCase().includes(desc)
  );

  // 5. Save matched results to localStorage
  localStorage.setItem("found_matches", JSON.stringify(matches));
  localStorage.setItem("userItem", JSON.stringify({ name, desc }));

  // 6. Redirect to match result page
  window.location.href = "match-result.html";
});
