function getStudents(){
return JSON.parse(localStorage.getItem("students"))||[];
}

function saveStudents(data){
localStorage.setItem("students",JSON.stringify(data));
}

function register(){

let name=document.getElementById("name").value;
let email=document.getElementById("email").value;
let password=document.getElementById("password").value;
let strand=document.getElementById("strand").value;

if(!name||!email||!password||!strand){
alert("Please fill all fields");
return;
}

let students=getStudents();

let exists=students.find(s=>s.email===email);

if(exists){
alert("Email already registered");
return;
}

students.push({
name,email,password,strand
});

saveStudents(students);

alert("Registration successful");

window.location="index.html";

}

function login(){

let email=document.getElementById("email").value;
let password=document.getElementById("password").value;

let students=getStudents();

let user=students.find(s=>s.email===email && s.password===password);

if(user){

localStorage.setItem("currentUser",JSON.stringify(user));

window.location="dashboard.html";

}else{

alert("Invalid login");

}

}

function logout(){

localStorage.removeItem("currentUser");

window.location="index.html";

}

function adminLogin(){

let u=document.getElementById("adminUser").value;
let p=document.getElementById("adminPass").value;

if(u==="admin" && p==="admin123"){
window.location="admin.html";
}else{
alert("Invalid admin");
}

}