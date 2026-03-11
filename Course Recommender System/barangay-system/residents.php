<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>

<?php
include "db.php";
$result = mysqli_query($conn, "SELECT * FROM residents");
?>

<!DOCTYPE html>
<html>
<head>
<title>Residents</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<h2>Barangay Residents</h2>

<a href="add_resident.php">Add Resident</a>

<table border="1" cellpadding="10">
<tr>
<th>ID</th>
<th>Name</th>
<th>Age</th>
<th>Gender</th>
<th>Address</th>
<th>Action</th>
</tr>

<?php while($row = mysqli_fetch_assoc($result)) { ?>

<tr>
<td><?php echo $row['id']; ?></td>
<td><?php echo $row['fullname']; ?></td>
<td><?php echo $row['age']; ?></td>
<td><?php echo $row['gender']; ?></td>
<td><?php echo $row['address']; ?></td>

<td>
<a href="edit_resident.php?id=<?php echo $row['id']; ?>">Edit</a>
<a href="delete_resident.php?id=<?php echo $row['id']; ?>" onclick="return confirm('Delete resident?')">Delete</a>
</td>

</tr>

<?php } ?>

</table>

</body>
</html>