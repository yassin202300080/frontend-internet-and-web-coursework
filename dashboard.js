const API_URL = "http://localhost:3000/api"; 

window.onload = async function() {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');

    if (!token || !userString) {
        window.location.href = 'index.html';
        return;
    }

    const user = JSON.parse(userString);

    const welcomeMsg = document.getElementById('welcome-msg');
    if (welcomeMsg) {
        const userName = user.name || "User";
        welcomeMsg.innerText = "Welcome, " + userName + " (" + user.role + ")";
    }

    setupActionBox(user.role);
    
    document.getElementById('home-section').style.display = 'block';
    document.getElementById('classes-section').style.display = 'none';
    
    await fetchClasses();
};

function setupActionBox(role) {
    const title = document.getElementById('action-title');
    const input = document.getElementById('action-input');
    const btn = document.querySelector('button[onclick="handleAction()"]');

    if (role === 'Staff') {
        title.innerText = "Create a New Class";
        input.placeholder = "Enter Class Name";
        btn.innerText = "Create Class";
    } else {
        title.innerText = "Join a Class";
        input.placeholder = "Enter Class Code";
        btn.innerText = "Join Class";
    }
}

async function handleAction() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const inputValue = document.getElementById('action-input').value;

    if (!inputValue) {
        alert("Please enter a value!");
        return;
    }

    let endpoint = (user.role === 'Staff') ? '/classrooms' : '/classrooms/join';
    let bodyData = (user.role === 'Staff') ? { className: inputValue } : { classCode: inputValue };

    const res = await fetch(API_URL + endpoint, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
        body: JSON.stringify(bodyData)
    });

    const data = await res.json();
    
    if (res.ok) {
        alert(data.message || "Success!");
        document.getElementById('action-input').value = "";
        fetchClasses();
    } else {
        alert("Error: " + data.error);
    }
}

async function fetchClasses() {
    const token = localStorage.getItem('token');
    
    const res = await fetch(API_URL + '/classrooms', {
        headers: { 'Authorization': "Bearer " + token }
    });
    
    const data = await res.json();
    const list = document.getElementById('class-list');
    list.innerHTML = "";

    if (!data || data.length === 0) {
        list.innerHTML = "<p>No classes found.</p>";
        return;
    }

    data.forEach(cls => {
        const div = document.createElement('div');
        div.style = "border:1px solid #ddd; padding:15px; margin-bottom:10px; background:white; border-radius:8px;";
        
        div.innerHTML = "<h3 style=\"margin:0; color:#6a0dad;\">" + cls.className + "</h3>" +
                       "<p style=\"margin:5px 0;\">Code: <b>" + cls.classCode + "</b></p>" +
                       "<button onclick=\"enterClass(" + cls.id + ", '" + cls.className + "')\" style=\"background:#6a0dad; color:white; border:none; padding:10px 15px; border-radius:5px; cursor:pointer;\">View Class</button>";
        list.appendChild(div);
    });
}

function enterClass(id, name) {
    localStorage.setItem('currentClassId', id);
    localStorage.setItem('currentClassName', name);
    window.location.href = "classroom.html";
}

function goHome() {
    document.getElementById('home-section').style.display = 'block';
    document.getElementById('classes-section').style.display = 'none';
}

function goToClasses() {
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('classes-section').style.display = 'block';
    fetchClasses();
}

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}
