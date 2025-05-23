async function updateProfile() {
    const email = localStorage.getItem("userEmail");
    const skillsInput = document.getElementById("skills").value.trim();
    const interestsInput = document.getElementById("interests").value.trim();
    const available = document.getElementById("availableCheckbox").checked;

    if (!email) {
        alert("Email is required.");
        return;
    }

    if (!skillsInput) {
        alert("You must add at least 1 skill.");
        return;
    }

    if (!interestsInput) {
        alert("You must add at least 1 interest.");
        return;
    }

    const confirmReplace = confirm(
        "This will replace any existing skills and interests. Do you want to continue?"
    );

    if (!confirmReplace) return;

    const payload = {
        email,
        skills: skillsInput,
        interests: interestsInput,
        available,
    };

    try {
        const res = await fetch("http://localhost:5000/api/profileSetup/set-profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            alert("Profile updated!");
            if (available) {
                window.location.href = "partner_finder.html";
            }
        } else {
            alert("Update failed.");
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        alert("Something went wrong. Please try again.");
    }
}
