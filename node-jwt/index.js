const jwt =require('jsonwebtoken')
const express = require('express')
const app = express();
const seceretKey = "seceretKey"


app.get('/',(req,res)=>{
    res.json('owais nismo bolte')
})

app.post("/login",(req,res)=>{
    const user = {
        id:1,
        username:"owais",
        email:"nismoowais1@gmail.com"
    }

    jwt.sign({user},seceretKey,{expiresIn:'3000s'},(err,token)=>{
        res.json({ token})
    })
})

    app.post("/profile",verifyToken,(req,res)=>{
    jwt.verify(req.token,seceretKey,(err,authData)=>{
        if(err){
            res.send({result:"invalid token"})
        }
        else{
            res.json({
                message:"profile is accessed",
                authData
            })
        }
    })
    })
    function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== "undefined"){
//   const bearer = bearerHeader.split(" ");
//   const token = bearer[1];
  req.token = token;
  console.log(token)
  next();

    }else{
        res.send({
            result:"token is not valid"
        })
    }
    }
app.listen(5000,()=>{
    console.log('app is running n 5000')
})