//Remove special characters from the name
function correctInput(input) {
  return input.replace(/[^a-zA-Z0-9\s.]/g, ""); // allow letters, numbers, spaces, and dots
}

// to display as text not run
function escapeHTML(str) {
  if (typeof str !== 'string') return ''; // prevent errors on null/undefined
  return str.replace(/[&<>"']/g, match => ({
    '&': "&amp;", '<': "&lt;", '>': "&gt;", '"': "&quot;", "'": "&#039;"
  }[match]));
}


// Session search
function searchSession() {
  const name = correctInput(document.getElementById("subjectName").value.trim());
  
  const resultDiv = document.getElementById("output");

  if (!name) {
    resultDiv.innerHTML = "Please enter a subject's name.";
    return;
  }

  fetch(`http://localhost:5000/api/lookup/searchSession?name=${encodeURIComponent(name)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        displaySessions(data.sessions);
      } else {
        alert("sessions not found");
      }
    })
    .catch(error => {
      console.error("Error fetching sessions:", error);
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
function displaySessions(sessions) {
  const output = document.getElementById('output');

  if (!Array.isArray(sessions) || sessions.length === 0) {
    output.innerHTML = "No session data available.";
    return;
  }

  let html = `<h3>Session Info</h3>`;
  sessions.forEach(session => {
    html += `
      <strong>${escapeHTML(session.name)}</strong><br>
      Type: ${escapeHTML(session.type)}<br>
      Location: ${escapeHTML(session.building)}, ${escapeHTML(session.floor)}<br>
      Time: ${escapeHTML(session.time)}<br>
      Instructor: ${escapeHTML(session.Instructor)}<br>
      classroom: ${escapeHTML(session.classroom)}<br>
      <hr>
    `;
  });

  output.innerHTML = html;
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