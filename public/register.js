async function reg(){
let u=document.getElementById("u").value;
let p=document.getElementById("p").value;

if(u==""||p==""){
alert("Fill all fields");
return;
}
let r=await fetch(API+"/register",{
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

alert(d.msg);
if(d.ok){
window.location="index.html";
}

}