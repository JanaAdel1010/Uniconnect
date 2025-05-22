// Sample data
const sessions = [
  { name: "CS101-SectionA", type: "Section", building: "Main Building", floor: "2nd Floor", time: "Sun 10AM-12PM" },
  { name: "CS101-Lecture", type: "Lecture", building: "Main Building", floor: "Conf Hall", time: "Mon 1PM-3PM" },
  { name: "CS101-Lab", type: "Lab", building: "Lab Building", floor: "Ground Floor", time: "Tue 2PM-4PM" }
];

const classrooms = [
  { name: "CENG 204", building: "Engineering Building", floor: "2nd Floor" },
  { name: "CS101", building: "Main Building", floor: "1st Floor" }
];

const doctors = [
  { name: "Dr. Nour Ali", building: "Admin Building", floor: "3rd Floor", office: "305", hours: "Sun-Tue 10AM-12PM" },
  { name: "Dr. Laila Kassem", building: "Science Building", floor: "2nd Floor", office: "212", hours: "Mon-Wed 1PM-3PM" }
];

//Remove special characters from the name
function correctInput(input) {
  return input.replace(/[^a-zA-Z0-9\s]/g, ""); // only allow letters, numbers, and spaces
}

// to display as text not run
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function(match) {
    const escape = { '&': "&amp;", '<': "&lt;", '>': "&gt;", '"': "&quot;", "'": "&#039;" };
    return escape[match];
  });
}

// Session search
function searchSession() {
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type');

  const subject = correctInput(document.getElementById("subjectName").value.trim());
  const resultDiv = document.getElementById("output");

  if (!subject) {
    resultDiv.innerHTML = "Please enter a subject.";
    return;
  }

  const apiUrl = `/api/session?name=${encodeURIComponent(subject)}${type ? `&type=${encodeURIComponent(type)}` : ''}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(results => {
      if (results.length > 0) {
        let html = `<h3>${type ? `${escapeHTML(type)}s` : 'Sessions'} for ${escapeHTML(subject)}</h3>`;
        results.forEach(s => {
          html += `<strong>${escapeHTML(s.name)}</strong><br>📍 ${escapeHTML(s.building)}, ${escapeHTML(s.floor)}<br>🕒 ${escapeHTML(s.time)}<br><br>`;
        });
        resultDiv.innerHTML = html;
      } else {
        resultDiv.innerHTML = `No ${type ? escapeHTML(type) : 'session'} found for ${escapeHTML(subject)}.`;
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

  fetch(`/api/searchClassroom?name=${encodeURIComponent(name)}`)
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

  fetch(`/api/searchDoctor?name=${encodeURIComponent(name)}`)
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

// Timetable
function showSessionsForTimetable() {
  let list = '';
  sessions.sort((a, b) => a.type.localeCompare(b.type));
  sessions.forEach((s, index) => {
    list += `<input type="checkbox" id="session${index}" value="${escapeHTML(s.name)}"> ${escapeHTML(s.name)} (${escapeHTML(s.type)}) - ${escapeHTML(s.time)}<br>`;
  });
  document.getElementById('sessionList').innerHTML = list;
}

function saveTimetable() {
  let selected = [];
  sessions.forEach((s, index) => {
    if (document.getElementById(`session${index}`).checked) {
      selected.push(s);
    }
  });
  localStorage.setItem('myTimetable', JSON.stringify(selected));
  displayMyTimetable();
}

function displayMyTimetable() {
  try {
    let timetable = JSON.parse(localStorage.getItem('myTimetable')) || [];
    if (!Array.isArray(timetable)) throw new Error("Invalid timetable format");

    let out = '';
    timetable.forEach(s => {
      out += `<strong>${escapeHTML(s.name)}</strong> (${escapeHTML(s.type)}) - ${escapeHTML(s.time)}<br>`;
    });
    document.getElementById('myTimetable').innerHTML = out;
    showNextSession();
  } catch (error) {
    console.error("Error reading timetable:", error);
    document.getElementById('myTimetable').innerHTML = "Unable to load timetable data.";
  }
}

function clearTimetable() {
  localStorage.removeItem('myTimetable');
  displayMyTimetable();
}

function showNextSession() {
  let timetable = JSON.parse(localStorage.getItem('myTimetable')) || [];
  if (timetable.length === 0) {
    document.getElementById('nextSession').innerHTML = "No upcoming sessions.";
    return;
  }
  document.getElementById('nextSession').innerHTML = `Next: ${escapeHTML(timetable[0].name)} at ${escapeHTML(timetable[0].time)}`;
}