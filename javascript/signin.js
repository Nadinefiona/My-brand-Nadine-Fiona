let email = document.getElementById("namet");
let password = document.getElementById("pass");
let login = document.getElementById("login");
let invalid = document.getElementById("invalid");

function clearForm(){
    email.value = "";
    password.value = "";
}

function showInvalidMessage(message) {
    invalid.innerHTML = `<p style="color:red; margin-left:-5%; "><u>${message}</u></p>`;
}

function clearInvalidMessage() {
    invalid.innerHTML = "";
}

login.addEventListener('click', (e) => {
    e.preventDefault();

    const user = {
        email: email.value,
        password: password.value,
    };

    fetch("https://mybrand-be-2.onrender.com/api/signin", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data); // Log the server response to see what it contains
        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "../Html/dashboard.html"; // Redirect to dashboard
        } else {
            clearForm(); // Clear the form fields
            showInvalidMessage("Plz Enter valid Credentials 🙄❓");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        showInvalidMessage("An error occurred. Please try again later.");
    });
});
