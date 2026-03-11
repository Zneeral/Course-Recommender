<?php
session_start();
include "db.php";

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username='$username'";
$result = $conn->query($sql);

if($result->num_rows > 0){

$user = $result->fetch_assoc();

if($password == $user['password']){

$_SESSION['user'] = $user['username'];
$_SESSION['role'] = $user['role'];

header("Location: dashboard.php");
exit();

}else{
header("Location: index.php?error=1");
}

}else{
header("Location: index.php?error=1");
}
?>