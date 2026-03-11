<?php
session_start();

if(!isset($_SESSION['user'])){
    header("Location: index.html");
}
?>

<h1>Welcome <?php echo $_SESSION['user']; ?></h1>
<p>Role: <?php echo $_SESSION['role']; ?></p>

<a href="logout.php">Logout</a>
<!DOCTYPE html>
<html>
<head>
    <title>Barangay Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body onload="initDashboard()">

<div class="layout">

    <!-- Sidebar -->
    <div class="sidebar">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYVJ9MfdGmEWsys-oyTBSJRc65f-sa4J6rw&s" class="logo">
        <h2>Barangay System</h2>
        <ul>
            <li id="navDashboard" onclick="showSection('dashboardSection','navDashboard')">Dashboard</li>
            <li id="navResidents" onclick="showSection('residentSection','navResidents')">Residents</li>

            <!-- Example Admin-only menu -->
            <li class="admin-only">Admin Panel</li>

            <li onclick="toggleDarkMode()">Dark Mode</li>
            <li onclick="logout()">Logout</li>
        </ul>
    </div>

    <!-- Main -->
    <div class="main">

        <div class="topbar">
    <div class="topbar-left">
        <h1>Barangay Management System</h1>
    </div>

    <div class="topbar-right">
        <span id="welcomeUser">Welcome</span>
        <span id="roleBadge" class="role-badge">Role</span>
    </div>
</div>

        <!-- Dashboard Section -->
        <div id="dashboardSection">
            <div class="card">
                <h3>Total Residents</h3>
                <p id="totalResidents">0</p>
            </div>
        </div>

        <!-- Residents Section -->
        <div id="residentSection">

            <div class="box">
                <h2>Add / Edit Resident</h2>

                <input type="text" id="name" placeholder="Full Name">
                <input type="number" id="age" placeholder="Age">
                <input type="text" id="address" placeholder="Address">

                <label>Photo</label>
                <input type="file" id="photo" accept="image/*">

                <button onclick="addResident()">Save Resident</button>
            </div>

            <div class="box">
                <h2>Resident List</h2>
                <input type="text" id="search" placeholder="Search..." onkeyup="searchResident()">

                <table>
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="residentTable"></tbody>
                </table>
            </div>

        </div>

    </div>
</div>

<script src="auth.js"></script>
<script src="script.js"></script>
</body>
</html>