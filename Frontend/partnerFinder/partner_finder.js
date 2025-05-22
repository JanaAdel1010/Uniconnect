async function findPartner() {
    let skillsInput = document.getElementById("skills").value.trim();
    let interestsInput = document.getElementById("interests").value.trim();

    // If empty, force to 'none'
    if (skillsInput === "") skillsInput = "none";
    if (interestsInput === "") interestsInput = "none";

    const skills = skillsInput.split(',').map(skill => skill.trim().toLowerCase());
    const interests = interestsInput.split(',').map(interest => interest.trim().toLowerCase());

    const list = document.getElementById('resultsList');
    list.innerHTML = '';

    // Validate user must not leave inputs empty
    if ((skills.length === 0 || (skills.length === 1 && skills[0] === "")) &&
        (interests.length === 0 || (interests.length === 1 && interests[0] === ""))) {
        alert("Please enter skills and/or interests, or type 'none' to select all.");
        return;
    }

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
