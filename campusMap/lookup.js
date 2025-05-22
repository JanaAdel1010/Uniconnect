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

// Session search
function searchSession() {
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type');

  const subject = document.getElementById("subjectName").value.trim();
  const resultDiv = document.getElementById("output");

  if (!subject) {
    resultDiv.innerHTML = "Please enter a subject.";
    return;
  }

  const results = sessions.filter(s => s.type === type && s.name.toLowerCase().includes(subject.toLowerCase()));

  if (results.length > 0) {
    let html = `<h3>${type}s for ${subject}</h3>`;
    results.forEach(s => {
      html += `<strong>${s.name}</strong><br>📍 ${s.building}, ${s.floor}<br>🕒 ${s.time}<br><br>`;
    });
    resultDiv.innerHTML = html;
  } else {
    resultDiv.innerHTML = `No ${type} found for ${subject}.`;
  }
}

// Classroom search
function searchClassroom() {
  const name = correctInput(document.getElementById("classroomName").value.trim());

  if (!nameInput) {
    document.getElementById("output").innerHTML = "Please enter a class's name.";
    return;
  }

  const result = classrooms.find(c => c.name.toLowerCase() === name.toLowerCase());

  document.getElementById("output").innerHTML = result
    ? `<strong>${result.name}</strong><br>📍 ${result.building}, ${result.floor}`
    : "Classroom not found.";
}

// Doctor search
function searchDoctor() {
  const name = correctInput(document.getElementById("doctorName").value.trim());

  if (!nameInput) {
    document.getElementById("output").innerHTML = "Please enter a doctor's name.";
    return;
  }

  const result = doctors.find(d => d.name.toLowerCase() === name.toLowerCase());

  document.getElementById("output").innerHTML = result
    ? `<strong>${result.name}</strong><br>📍 ${result.building}, ${result.floor}, Office: ${result.office}<br>🕒 Office Hours: ${result.hours}`
    : "Doctor not found.";
}

// Timetable
function showSessionsForTimetable() {
  let list = '';
  sessions.forEach((s, index) => {
    list += `<input type="checkbox" id="session${index}" value="${s.name}"> ${s.name} (${s.type}) - ${s.time}<br>`;
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
  let timetable = JSON.parse(localStorage.getItem('myTimetable')) || [];
  let out = '';
  timetable.forEach(s => {
    out += `<strong>${s.name}</strong> (${s.type}) - ${s.time}<br>`;
  });
  document.getElementById('myTimetable').innerHTML = out;
  showNextSession();
}