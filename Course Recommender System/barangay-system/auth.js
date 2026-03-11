// ===== LOAD USERS =====
let users = JSON.parse(localStorage.getItem("users")) || [];

// Always ensure admin exists
ensureAdminExists();

// ===== HASH FUNCTION =====
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

// ===== ENSURE ADMIN EXISTS =====
async function ensureAdminExists() {
    let admin = users.find(u => u.username === "admin");

    if (!admin) {
        const hashedPassword = await hashPassword("admin123");

        users.push({
            username: "admin",
            password: hashedPassword,
            role: "admin"
        });

        localStorage.setItem("users", JSON.stringify(users));
    } else {
        // Force admin role if someone changed it
        admin.role = "admin";
        localStorage.setItem("users", JSON.stringify(users));
    }
}

// ===== REGISTER (STAFF ONLY) =====
async function register() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please fill all fields");
        return;
    }

    // Prevent creating fake admin
    if (username.toLowerCase() === "admin") {
        alert("Username 'admin' is reserved.");
        return;
    }

    if (users.find(u => u.username === username)) {
        alert("Username already exists");
        return;
    }

    const hashedPassword = await hashPassword(password);

    users.push({
        username: username,
        password: hashedPassword,
        role: "staff"
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert("Staff account created successfully!");
}

// ===== LOGIN =====
async function login() {
    let username = document.getElementById("username").value;
let password = document.getElementById("password").value;

fetch("login.php",{
method:"POST",
headers:{
"Content-Type":"application/x-www-form-urlencoded"
},
body:`username=${username}&password=${password}`
})
.then(res=>res.text())
.then(data=>{

if(data==="success"){
window.location="dashboard.php";
}else{
document.getElementById("error").innerText="Invalid Login";
}

})

}

// ===== AUTO REDIRECT =====
function redirectIfLoggedIn() {
    let user = localStorage.getItem("loggedUser");
    if (user) {
        window.location.href = "dashboard.html";
    }
}

// ===== SESSION CHECK =====
function checkLogin() {
    let user = localStorage.getItem("loggedUser");
    if (!user) {
        window.location.href = "index.html";
    }
}

// ===== GET CURRENT USER =====
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("loggedUser"));
}

// ===== DASHBOARD INIT =====
function initDashboard() {
    checkLogin();

    let user = getCurrentUser();

    if (user) {
        let welcome = document.getElementById("welcomeUser");
        if (welcome) {
            welcome.innerText = "Welcome, " + user.username;
        }

        let badge = document.getElementById("roleBadge");
        if (badge) {
            badge.innerText = user.role.toUpperCase();

            if (user.role === "admin") {
                badge.classList.add("admin-badge");
            } else {
                badge.classList.add("staff-badge");
            }
        }

        // Hide admin-only features for staff
        if (user.role === "staff") {
            document.querySelectorAll(".admin-only")
                .forEach(el => el.style.display = "none");
        }
    }
}

// ===== ADMIN PROTECTION =====
function requireAdmin() {
    let user = getCurrentUser();

    if (!user || user.role !== "admin") {
        alert("Access denied. Admin only.");
        window.location.href = "dashboard.html";
    }
}

// ===== LOGOUT =====
function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "index.html";
}