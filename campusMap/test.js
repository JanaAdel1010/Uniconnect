// Test cases for the campus map application
function checkEqual(actual, expected, testName) {
    if (actual === expected) {
      console.log(`${testName} Passed`);
    } else {
      console.error(`${testName}. Expected "${expected}", but got "${actual}"`);
    }
  }
  
  function runTests() {  
    // Test correctInput function
    const dirtyInput = "CS101<script>";
    const cleanInput = correctInput(dirtyInput);
    checkEqual(cleanInput, "CS101script", "Correct Input removes invalid characters");
  
    // Test doctor search
    let testDoctor = doctors.find(d => d.name === "Dr. Laila Kassem");
    checkEqual(testDoctor.name, "Dr. Laila Kassem", "Doctor 'Dr. Laila Kassem' exists");
  
    testDoctor = doctors.find(d => d.name === "Non existent");
    checkEqual(testDoctor, undefined, "Non existent Doctor not found");
  
    // Test classroom search
    let testClassroom = classrooms.find(c => c.name === "CENG 204");
    checkEqual(testClassroom.building, "Engineering Building", "Classroom 'CENG 204' exists");
  
    testClassroom = classrooms.find(c => c.name === "Non existent Room");
    checkEqual(testClassroom, undefined, "Non existent classroom not found");
  
    // Test session search
    const lectures = sessions.filter(s => s.type === "Lecture");
    checkEqual(lectures.length, 1, "One lecture found");
  
    // Test timetable localStorage
    localStorage.setItem('myTimetable', JSON.stringify([{ name: "CS101-Lecture", type: "Lecture", time: "Mon 1PM-3PM" }]));
    const timetable = JSON.parse(localStorage.getItem('myTimetable'));
    checkEqual(timetable[0].name, "CS101-Lecture", "Timetable localStorage works");
  
    console.log("All basic tests complete.");
  }
  
  runTests();