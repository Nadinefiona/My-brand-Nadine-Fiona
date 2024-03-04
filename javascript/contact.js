function validateForm() {
    document.getElementById('nameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('messageError').innerText = '';


    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    if (name.length < 5) {
        document.getElementById('nameError').innerText = 'name must be at least 3 characters.';
        return false;
    }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.indexOf('@') === -1) {
        document.getElementById('emailError').innerText = 'Please enter a valid email address.';
        return false;
    }
    if (message.length < 10) {
        document.getElementById('messageError').innerText = 'Message must be at least 10 characters.';
        return false;
    }
    return true;
}
