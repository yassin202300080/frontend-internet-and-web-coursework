const API_URL = "http://localhost:3000/api";

function showRegister() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
    document.getElementById("error-message").innerText = "";
}

function showLogin() {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("error-message").innerText = "";
}

async function register() {
    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const role = document.getElementById("reg-role").value;

    if (name === "" || email === "" || password === "") {
        document.getElementById("error-message").innerText = "missing field fields";
        return;
    }

    try {
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
            document.getElementById("error-message").innerText = data.error;
        }
    } catch (e) {
        document.getElementById("error-message").innerText = "Server error";
    }
}

async function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (email === "" || password === "") {
        document.getElementById("error-message").innerText = "enter email and password";
        return;
    }

    try {
        const response = await fetch(API_URL + "/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Login successful");
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("error-message").innerText = data.error;
        }
    } catch (e) {
        document.getElementById("error-message").innerText = "Cannot connect to server";
    }
}
