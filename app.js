const API_URL = "http://localhost:3000/api";

function showRegister() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
    document.getElementById("error-message").innerText = "";
function showLogin() {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("error-message").innerText = "";
}