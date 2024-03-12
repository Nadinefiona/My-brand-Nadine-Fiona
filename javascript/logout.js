const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "./../Html/sigin.html";
        }


        const logoutBtn = document.getElementById('logoutBtn');
        logoutBtn.addEventListener('click', function () {
            localStorage.removeItem('token');
            window.location.href = "./../Html/sigin.html";
        });