//Remove special characters from the name
function correctInput(input) {
  return input.replace(/[^a-zA-Z0-9\s.]/g, ""); // allow letters, numbers, spaces, and dots
}

// to display as text not run
function escapeHTML(str) {
  if (typeof str !== 'string') return ''; // ✅ prevent errors on null/undefined
  return str.replace(/[&<>"']/g, match => ({
    '&': "&amp;", '<': "&lt;", '>': "&gt;", '"': "&quot;", "'": "&#039;"
  }[match]));
}


// Session search
function searchSession() {
  const type = document.getElementById("sessionType").value;
  const subject = correctInput(document.getElementById("subjectName").value.trim());
  const resultDiv = document.getElementById("output");

  if (!type) {
    resultDiv.innerHTML = "Please select a session type.";
    return;
  }

  if (!subject) {
    resultDiv.innerHTML = "Please enter a subject.";
    return;
  }

  // Check locally if the session exists for the selected type
  const matchedSession = sessions.find(s => 
    s.type.toLowerCase() === type.toLowerCase() && s.name.toLowerCase() === subject.toLowerCase()
  );

  if (!matchedSession) {
    resultDiv.innerHTML = `No ${type} found with the name "${subject}".`;
    return;
  }

  // If valid, proceed to fetch API
  const apiUrl = `http://localhost:5000/api/lookup/searchSession?name=${encodeURIComponent(subject)}&type=${encodeURIComponent(type)}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(results => {
      if (results.length > 0) {
        let html = `<h3>${escapeHTML(type)}s for ${escapeHTML(subject)}</h3>`;
        results.forEach(s => {
          html += `<strong>${escapeHTML(s.name)}</strong><br> ${escapeHTML(s.building)}, ${escapeHTML(s.floor)}<br> ${escapeHTML(s.time)}<br><br>`;
        });
        resultDiv.innerHTML = html;
      } else {
        resultDiv.innerHTML = `No ${type} found for ${escapeHTML(subject)}.`;
      }
    })
    .catch(err => {
      console.error(err);
      resultDiv.innerHTML = "An error occurred while searching sessions.";
    });
}

// Classroom search
function searchClassroom() {
  const name = correctInput(document.getElementById("classroomName").value.trim());
  const resultDiv = document.getElementById("output");

  if (!name) {
    resultDiv.innerHTML = "Please enter a class's name.";
    return;
  }

  fetch(`http://localhost:5000/api/lookup/searchClassroom?name=${encodeURIComponent(name)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        displayClassroom(data.classroom);
      } else {
        alert("Classroom not found");
      }
    })
    .catch(error => {
      console.error("Error fetching classroom:", error);
    });
}

// Doctor search
function searchDoctor() {
  const name = correctInput(document.getElementById("doctorName").value.trim());
  const resultDiv = document.getElementById("output");

  if (!name) {
    resultDiv.innerHTML = "Please enter a doctor's name.";
    return;
  }
  console.log(`Requesting: http://localhost:5000/api/lookup/searchDoctor?name=${encodeURIComponent(name)}`);
  fetch(`http://localhost:5000/api/lookup/searchDoctor?name=${encodeURIComponent(name)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        displayDoctor(data.doctor);
      } else {
        alert("Doctor not found");
      }
    })
    .catch(error => {
      console.error("Error fetching doctor:", error);
    });
}

function displayClassroom(classroom) {
  const resultDiv = document.getElementById("output");
  resultDiv.innerHTML = `<h3>Classroom Info</h3>
    <strong>${escapeHTML(classroom.name)}</strong><br>
    ${escapeHTML(classroom.building)}, ${escapeHTML(classroom.floor)}<br>`;
}

function displayDoctor(doctor) {
  const output = document.getElementById('output');
  if (!doctor || !doctor.name) {
    output.innerHTML = "Invalid doctor data.";
    return;
  }
  output.innerHTML = `
    <h3>${escapeHTML(doctor.name)}</h3>
    ${escapeHTML(doctor.building)}, ${escapeHTML(doctor.floor)}<br>
    Hours: ${escapeHTML(doctor.hours)}<br>
  `;
}