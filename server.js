const express = require ("express");
const app = express();
const cors = require("cors");

let options ={
    orgine : "*"
}

app.use(cors(options))

let listuser = [];

app.use(express.json());
 
app.get("/to-do",function(req,res){
res.json(listuser);
})

app.post("/user-create",function(req,res){
    // console.log(req.body)
    req.body.id = listuser.length +1
    listuser.push(req.body)
    res.json({massage:"success"})

})

app.put("/user/:id",function(req,res){
    let index = listuser.findIndex(obj=>obj.id == req.params.id)

    //update the object with new data

    let keyArray = Object.keys(req.body);
    keyArray.forEach((obj)=>{
        listuser[index][obj]= req.body[obj]
    })
    res.json({massage : "update the data"})
})

app.delete("/user/:id",function(req,res){
    let index = listuser.findIndex(obj =>obj.id == req.params.id)
    listuser.splice(index,1)
    res.json({massage :"data has delated"});
})

app.get("/users/:id",function(req,res){
    let user = listuser.find(obj => obj.id == req.params.id)
    if(user){
        res.json(user)
    }else{
        res.status(404).json({massage:"data not found"})
    }
})

app.listen(3000)