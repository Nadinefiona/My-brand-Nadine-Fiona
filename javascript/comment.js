function validateForm() {
    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var comment = document.getElementById("comment").value;

    var nameError = document.getElementById("nameError");
    var emailError = document.getElementById("emailError");
    var commentError = document.getElementById("commentError");

    nameError.innerHTML = "";
    emailError.innerHTML = "";
    commentError.innerHTML = "";

    var isValid = true;

    if (fullName.length <= 10) {
        nameError.innerHTML = "Name must be more than 10 characters";
        isValid = false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.innerHTML = "Enter a valid email address";
        isValid = false;
    }

    if (comment.length <= 15) {
        commentError.innerHTML = "Comment must be more than 15 characters";
        isValid = false;
    }

    return isValid;
}