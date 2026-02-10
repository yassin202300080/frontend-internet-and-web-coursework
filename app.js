const API_URL = "http://localhost:3000/api";

function decodeToken(token) {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
}

function showRegister() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
}

function showLogin() {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}

async function register() {
    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const role = document.getElementById("reg-role").value;

    const response = await fetch(API_URL + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
    });

    const data = await response.json();

    if (response.ok) {
        alert("Registered successfully");
        showLogin();
    } else {
        alert(data.error);
    }
}

async function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch(API_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("token", data.token);
        
        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
        } else {
            const user = decodeToken(data.token);
            localStorage.setItem("user", JSON.stringify(user));
        }

        window.location.href = "dashboard.html";
    } else {
        alert(data.error);
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "index.html";
}
