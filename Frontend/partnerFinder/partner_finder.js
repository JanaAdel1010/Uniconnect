async function findPartner() {
    let skillsInput = document.getElementById("skills").value.trim();
    let interestsInput = document.getElementById("interests").value.trim();

    if ((skillsInput === "" || skillsInput.toLowerCase() !== "none" && skillsInput === "") &&
        (interestsInput === "" || interestsInput.toLowerCase() !== "none" && interestsInput === "")) {
        alert("Please enter skills and interests, or type 'none' to select all.");
        return;
    } else if (skillsInput === "" || skillsInput.toLowerCase() !== "none" && skillsInput === "") {
        alert("Please enter skills, or type 'none' if you don't want specific skills to select all.");
        return;
    } else if (interestsInput === "" || interestsInput.toLowerCase() !== "none" && interestsInput === "") {
        alert("Please enter interests, or type 'none' if you don't want specific interests to select all.");
        return;
    }
    if (skillsInput === "") skillsInput = "none";
    if (interestsInput === "") interestsInput = "none";

    const skills = skillsInput.split(',').map(skill => skill.trim().toLowerCase());
    const interests = interestsInput.split(',').map(interest => interest.trim().toLowerCase());

    const list = document.getElementById('resultsList');
    list.innerHTML = '';

    try {
        const response = await fetch('http://localhost:5000/api/partnerFinder/find-partners', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ skills, interests })
        });

        if (!response.ok) throw new Error('Request failed');

        const result = await response.json();

        if (result.length === 0) {
            list.innerHTML = '<li>No matching partners found</li>';
            return;
        } else {
            result.forEach(user => {
                const li = document.createElement('li');
                li.innerHTML = `
        <strong>${user.username}</strong><br>
        Email: ${user.email}<br>
        Skills: ${user.skills.join(', ')}<br>
        Interests: ${user.interests.join(', ')}<br>
        Match Score: ${user.matchScore}
        `;
                list.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching partners. Please try again later.');
    }
}
