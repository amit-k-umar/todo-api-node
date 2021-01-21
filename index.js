const express = require('express')
const mysql=require('mysql')
const app= express();
const cors= require('cors');
require("dotenv/config")
const PORT = process.env.PORT || 5000;
app.use(express.json());
var db= require('./db')
app.get("/",async (req,res)=>{
  let db_comand='SELECT * FROM todos'
  db.query(db_comand,(err, result)=>{
    if(err) res.send("some thing is wrong");
    res.send(result);
})
})

app.post("/add", async (req,res)=>{
    
   let db_comand=`insert into todos(todo) values('${req.body.todo}');`
   console.log(req.body.todo);
   let todo={todo: req.body.todo}
   await db.query(db_comand,(err, result)=>{
        
        if(err){
          console.log(err);
          res.send("todos must be unique");
        } 
        else  res.send('added');
   })
  
})
app.delete("/:id",async (req,res)=>{
   var id=req.params.id;
   let db_comand=`DELETE FROM todos WHERE _id=${id}`
   db.query(db_comand,(err, result)=>{
    if(err) res.send("some thing is wrong");
    res.send("sucessfully deleted");
})
})
app.put("/:id",async (req,res)=>{
  if(! req.body.todo)
  res.send('todo can not be empty');
  var id=req.params.id;
  let db_comand=`UPDATE todos
  SET todo = '${req.body.todo}', updated= CURRENT_TIMESTAMP 
  WHERE _id = ${id};`
   db.query(db_comand,(err, result)=>{
    if(err) res.send("some thing is wrong");
    else res.send("sucessfully updated");
})
})

  

app.listen(PORT, async ()=>{
  console.log("started server")
})