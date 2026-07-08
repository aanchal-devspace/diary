async function login(){
let u=document.getElementById("u").value;
let p=document.getElementById("p").value;

if(u==""||p==""){
alert("Fill all fields");
return;
}

let r=await fetch(API+"/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username:u,
password:p
})
});

let d=await r.json();

if(d.ok){

localStorage.setItem("id",d.id);
localStorage.setItem("username",d.username);
window.location="diary.html";

}
else{
alert(d.msg);
}

}