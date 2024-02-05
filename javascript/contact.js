function validateForm() {
    document.getElementById('emailError').innerText = '';
    document.getElementById('messageError').innerText = '';

    // Get values from the form
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Validate email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.indexOf('@') === -1) {
        document.getElementById('emailError').innerText = 'Please enter a valid email address.';
        return false;
    }

    // Validate message length
    if (message.length < 10) {
        document.getElementById('messageError').innerText = 'Message must be at least 10 characters.';
        return false;
    }

    // If all validations pass, you can submit the form
    // Uncomment the line below if you want the form to be submitted
    // document.getElementById('myForm').submit();

    return true;
}
