let residents = JSON.parse(localStorage.getItem("residents")) || [];
let editIndex = -1;

/* Navigation */
function showSection(sectionId, navId) {
    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("residentSection").style.display = "none";

    document.getElementById(sectionId).style.display = "block";

    document.getElementById("navDashboard").classList.remove("active");
    document.getElementById("navResidents").classList.remove("active");
    document.getElementById(navId).classList.add("active");
}

showSection("dashboardSection", "navDashboard");

/* Dark mode */
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

/* Add or Update */
function addResident() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let address = document.getElementById("address").value;
    let photoInput = document.getElementById("photo");

    if (!name || !age || !address) {
        alert("Fill all fields");
        return;
    }

    let reader = new FileReader();

    reader.onload = function(e) {
        let photoData = photoInput.files[0] ? e.target.result : null;

        if (editIndex === -1) {
            let id = "RES-" + (residents.length + 1);
            residents.push({ id, name, age, address, photo: photoData });
        } else {
            residents[editIndex].name = name;
            residents[editIndex].age = age;
            residents[editIndex].address = address;
            if (photoData) residents[editIndex].photo = photoData;
            editIndex = -1;
        }

        localStorage.setItem("residents", JSON.stringify(residents));
        clearForm();
        displayResidents();
    };

    if (photoInput.files[0]) {
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        reader.onload({ target: { result: null } });
    }
}

/* Display */
function displayResidents() {
    let table = document.getElementById("residentTable");
    table.innerHTML = "";

    residents.forEach((r, index) => {
        let photo = r.photo ? r.photo : "https://via.placeholder.com/40";

        table.innerHTML += `
            <tr>
                <td><img src="${photo}" class="resident-photo"></td>
                <td>${r.id}</td>
                <td>${r.name}</td>
                <td>${r.age}</td>
                <td>${r.address}</td>
                <td>
                    <button class="edit-btn" onclick="editResident(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteResident(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalResidents").innerText = residents.length;
}

/* Edit */
function editResident(index) {
    document.getElementById("name").value = residents[index].name;
    document.getElementById("age").value = residents[index].age;
    document.getElementById("address").value = residents[index].address;
    editIndex = index;
}

/* Delete */
function deleteResident(index) {
    if (confirm("Delete this resident?")) {
        residents.splice(index, 1);
        localStorage.setItem("residents", JSON.stringify(residents));
        displayResidents();
    }
}

/* Search */
function searchResident() {
    let input = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#residentTable tr");

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    });
}

/* Clear */
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("photo").value = "";
}

displayResidents();
