const sessions = [
  { name: "CS101-SectionA", type: "Section", building: "Main Building", floor: "2nd Floor", time: "Sunday 10AM-12PM" },
  { name: "CS101-Lecture", type: "Lecture", building: "Main Building", floor: "Conference Hall", time: "Monday 1PM-3PM" },
  { name: "CS101-Lab", type: "Lab", building: "Lab Building", floor: "Ground Floor", time: "Tuesday 2PM-4PM" },
  { name: "Database-SectionB", type: "Section", building: "Engineering Building", floor: "3rd Floor", time: "Wednesday 9AM-11AM" }
];

const classrooms = [
  { name: "CENG 204", building: "Engineering Building", floor: "2nd Floor" },
  { name: "CS101", building: "Main Building", floor: "1st Floor" }
];

const doctors = [
  { name: "Dr. Nour Ali", building: "Admin Building", floor: "3rd Floor", office: "305", officeHours: "Sun-Tue 10AM-12PM" },
  { name: "Dr. Laila Kassem", building: "Science Building", floor: "2nd Floor", office: "212", officeHours: "Mon-Wed 1PM-3PM" }
];

function showSessionOptions() {
  document.getElementById("session-options").classList.remove("hidden");
  document.getElementById("output").innerHTML = '';
}

function findSession(type) {
  let subject = prompt(`Enter the subject name (e.g. CS101):`);
  let matches = sessions.filter(s => s.type === type && s.name.startsWith(subject));

  if (matches.length > 0) {
    let html = `<h3>${type}s for ${subject}</h3>`;
    matches.forEach(s => {
      html += `
        <strong>${s.name}</strong><br>
        📍 ${s.building}, ${s.floor}<br>
        🕒 ${s.time}<br><br>
      `;
    });
    document.getElementById("output").innerHTML = html;
  } else {
    document.getElementById("output").innerHTML = `❌ No ${type} found for ${subject}.`;
  }
}

function findClassroom() {
  let roomName = prompt("Enter the class name (e.g. CENG 204):");
  let result = classrooms.find(c => c.name.toLowerCase() === roomName.toLowerCase());

  if (result) {
    document.getElementById("output").innerHTML = `
      📖 <strong>${result.name}</strong> is in ${result.building}, ${result.floor}
    `;
  } else {
    document.getElementById("output").innerHTML = `❌ Classroom not found.`;
  }
}

function findDoctor() {
  let doctorName = prompt("Enter the doctor's full name (e.g. Dr. Nour Ali):");
  let result = doctors.find(d => d.name.toLowerCase() === doctorName.toLowerCase());

  if (result) {
    document.getElementById("output").innerHTML = `
      🩺 <strong>${result.name}</strong><br>
      📍 ${result.building}, ${result.floor}, Office: ${result.office}<br>
      🕒 Office Hours: ${result.hours}
    `;
  } else {
    document.getElementById("output").innerHTML = `❌ Doctor not found.`;
  }
}

function goBack() {
  document.getElementById("main-menu").classList.remove("hidden");
  document.getElementById("session-menu").classList.add("hidden");
  document.getElementById("output").innerHTML = "";
}

function hideMenus() {
  document.getElementById("main-menu").classList.add("hidden");
  document.getElementById("session-menu").classList.add("hidden");
}