async function setAvailability(isAvailable) {
    const email = localStorage.getItem("userEmail");
    
    if (!email) {
        alert("Email is required.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/profileSetup/update-availability", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                available: isAvailable,
            }),
        });

        if (response.ok) {
            const status = isAvailable ? "available" : "not available";
            alert(`Availability updated to ${status}`);

            if (isAvailable) {
                window.location.href = "partner_finder.html";
            }
        } else {
            alert("Failed to update availability.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }
}
