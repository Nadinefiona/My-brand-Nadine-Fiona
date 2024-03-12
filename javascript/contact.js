
let loading = `<style>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  padding-left: 90%
  border-top: 16px solid black;
  border-bottom: 16px solid green;
  width: 2.5px;
  height: 2.5px;
  -webkit-animation: spin 10s linear infinite;
  animation: spin 10s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
</head>
<body>  
<div class="loader" style="margin-left:20%;"></div>
`



function validateForm() {
    document.getElementById('nameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('messageError').innerText = '';

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var text = document.getElementById('text').value;

    if (name.length < 5) {
        document.getElementById('nameError').innerText = 'Name must be at least 5 characters.';
        return false;
    }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.indexOf('@') === -1) {
        document.getElementById('emailError').innerText = 'Please enter a valid email address.';
        return false;
    }
    if (text.length < 10) {
        document.getElementById('messageError').innerText = 'Message must be at least 10 characters.';
        return false;
    }

    return true;
}


// let loading = `<div class="loader" style="margin-left: 20%;"></div>`;

document.getElementById("myForm").addEventListener('submit', function(e) {
    e.preventDefault();

    if (validateForm()) {
        // console.log("hi")
        // document.getElementById("success").innerHTML = loading;

        const data = {
            email: document.getElementById("email").value,
            name: document.getElementById("name").value,
            text: document.getElementById("text").value,
        };

        fetch("https://mybrand-be-2.onrender.com/api/messages", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                document.getElementById("success").innerHTML = `Message received!`;
            } else {
                document.getElementById("success").innerHTML = `<p style="font-size: 23px; color: #343D68;">wow!!👏 message sent.🎊🎊</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("success").innerHTML = `<p style="font-size: 15px; color: red;">Failed to send message.</p>`;
        });

        clearForm();
    }
});

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("text").value = "";
}
