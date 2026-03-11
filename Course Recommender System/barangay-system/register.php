<?php
include "db.php";

$username = $_POST['username'];
$password = $_POST['password'];

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (username,password,role)
        VALUES ('$username','$hashedPassword','staff')";

if($conn->query($sql)){
    echo "success";
}else{
    echo "error";
}
?>