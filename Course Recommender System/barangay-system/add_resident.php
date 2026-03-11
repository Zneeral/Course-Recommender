<?php
include "db.php";

if(isset($_POST['submit'])){

$fullname = $_POST['fullname'];
$age = $_POST['age'];
$gender = $_POST['gender'];
$address = $_POST['address'];
$contact = $_POST['contact'];

$sql = "INSERT INTO residents (fullname,age,gender,address,contact)
VALUES ('$fullname','$age','$gender','$address','$contact')";

$conn->query($sql);

header("Location: residents.php");

}
?>

<!DOCTYPE html>
<html>
<head>
<title>Add Resident</title>
</head>

<body>

<h2>Add Resident</h2>

<form method="POST">

Name
<input type="text" name="fullname" required>

Age
<input type="number" name="age">

Gender
<select name="gender">
<option>Male</option>
<option>Female</option>
</select>

Address
<input type="text" name="address">

Contact
<input type="text" name="contact">

<button type="submit" name="submit">Save</button>

</form>

</body>
</html>