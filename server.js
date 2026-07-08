const express=require("express");
const cors=require("cors");
const fs=require("fs");

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/register",(req,res)=>{

    let u=req.body.username;
    let p=req.body.password;
    if(u==""||p==""){
        return res.json({ok:false,msg:"Fill all fields"});
    }

    let a=JSON.parse(fs.readFileSync("./users.json"));

    let f=a.find(x=>x.username==u);

    if(f){
        return res.json({ok:false,msg:"Username already exists"});
    }

    let d={
        id:Date.now(),
        username:u,
        password:p
    };

    a.push(d);

    fs.writeFileSync("./users.json",JSON.stringify(a,null,2));

    res.json({ok:true,msg:"Registered Successfully"});
});
app.post("/login",(req,res)=>{

    let u=req.body.username;
    let p=req.body.password;

    if(u==""||p==""){
        return res.json({ok:false,msg:"Fill all fields"});
    }
    let a=JSON.parse(fs.readFileSync("./users.json"));
    let f=a.find(x=>x.username==u && x.password==p);

    if(!f){
        return res.json({ok:false,msg:"Invalid Username or Password"});
    }
    res.json({
        ok:true,
        msg:"Login successful",
        id:f.id,
        username:f.username
    });
});
app.post("/diary",(req,res)=>{

let id=req.body.id;
let t=req.body.title;
let c=req.body.content;
if(t==""||c==""){
return res.json({ok:false,msg:"Fill all fields"});
}

let a=JSON.parse(fs.readFileSync("./diary.json"));
let d={
id:Date.now(),
userId:id,
title:t,
content:c,
date:new Date().toLocaleDateString()
};
a.push(d);

fs.writeFileSync("./diary.json",JSON.stringify(a,null,2));
res.json({ok:true,msg:"Entry Saved"});
});
app.get("/diary/:id",(req,res)=>{

let id=req.params.id;
let a=JSON.parse(fs.readFileSync("./diary.json"));
let d=a.filter(x=>x.userId==id);
res.json(d);

});
app.delete("/diary/:id",(req,res)=>{
let id=req.params.id;
let a=JSON.parse(fs.readFileSync("./diary.json"));
a=a.filter(x=>x.id!=id);

fs.writeFileSync("./diary.json",JSON.stringify(a,null,2));
res.json({
ok:true,
msg:"Entry Deleted"
});
});
app.put("/diary/:id",(req,res)=>{

let id=req.params.id;
let t=req.body.title;
let c=req.body.content;
let a=JSON.parse(fs.readFileSync("./diary.json"));
let i=a.findIndex(x=>x.id==id);

if(i==-1){
return res.json({
ok:false,
msg:"Entry not found"
});
}
a[i].title=t;
a[i].content=c;
fs.writeFileSync("./diary.json",JSON.stringify(a,null,2));

res.json({
ok:true,
msg:"Entry Updated"
});
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server Started");
});