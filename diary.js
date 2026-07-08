let id=localStorage.getItem("id");

let u=localStorage.getItem("username");
document.getElementById("wel").innerHTML="Welcome";

function logout(){
localStorage.clear();
window.location="index.html";
}
async function add(){
let t=document.getElementById("t").value;
let c=document.getElementById("c").value;

if(t==""||c==""){
alert("Fill all fields");
return;
}
let r=await fetch(API+"/diary",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
id:id,
title:t,
content:c
})
});

let d=await r.json();

alert(d.msg);
if(d.ok){
document.getElementById("t").value="";
document.getElementById("c").value="";
show();
}

}

async function show(){
let r=await fetch(API+"/diary/"+id);

let a=await r.json();
let s="";

for(let i=0;i<a.length;i++){
s+=`
<div class="card">

<h3>${a[i].title}</h3>
<small>${a[i].date}</small>

<p>${a[i].content}</p>
<button onclick="edit(${a[i].id})">Edit</button>
<button onclick="del(${a[i].id})">Delete</button>
</div>
`;

}
document.getElementById("show").innerHTML=s;

}
async function del(id){
let ok=confirm("Delete this entry?");

if(!ok){
return;
}
let r=await fetch(API+"/diary/"+id,{
method:"DELETE"
});
let d=await r.json();
alert(d.msg);
show();

}