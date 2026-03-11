<?php
include "db.php";

$id = $_GET['id'];

$result = $conn->query("SELECT * FROM residents WHERE id=$id");
$row = $result->fetch_assoc();

if(isset($_POST['update'])){

$fullname = $_POST['fullname'];
$age = $_POST['age'];
$gender = $_POST['gender'];
$address = $_POST['address'];
$contact = $_POST['contact'];

$sql = "UPDATE residents SET
fullname='$fullname',
age='$age',
gender='$gender',
address='$address',
contact='$contact'
WHERE id=$id";

$conn->query($sql);

header("Location: residents.php");

}
?>

<!DOCTYPE html>
<html>
<head>
<title>Edit Resident</title>
</head>

<body>

<h2>Edit Resident</h2>

<form method="POST">

Name
<input type="text" name="fullname" value="<?php echo $row['fullname']; ?>">

Age
<input type="number" name="age" value="<?php echo $row['age']; ?>">

Gender
<input type="text" name="gender" value="<?php echo $row['gender']; ?>">

Address
<input type="text" name="address" value="<?php echo $row['address']; ?>">

Contact
<input type="text" name="contact" value="<?php echo $row['contact']; ?>">

<button type="submit" name="update">Update</button>

</form>

</body>
</html>