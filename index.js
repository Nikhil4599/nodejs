const mysql=require('mysql');
const express=require('express');
var app=express();
const bodyparser=require('body-parser');

app.use(bodyparser.json());

const conn=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database:'nodejs'
});

conn.connect((err)=>{
    if(!err)
        console.log('Connected!');
    else
        console.log(err);
});

app.listen(3000,()=>console.log('express server is running'));

//get all users details
app.get('/get',(req,res)=>{
    conn.query('SELECT * FROM user',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
            
    });
});


//get one user details
app.get('/get/:id',(req,res)=>{
    conn.query('SELECT * FROM user WHERE id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
            
    });
});


//DELETE one user 
app.delete('/delete/:id',(req,res)=>{
    conn.query('DELETE FROM user WHERE id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
            res.send("DELETE SUCCESSFULLY");
        else
            console.log(err);
            
    });
});


//Insert one user 
app.post('/add',(req,res)=>{
    let user = req.body;
    var sql  = 'INSERT INTO user (name,email,age) VALUES(?,?,?)';
    conn.query(sql,[user.name,user.email,user.age],(err,rows,fields)=>{
        if(!err)
            res.send("Insert Item Successfully");
        else
            console.log(err);
            
    });
});


//Update one user 
app.put('/update/:id',(req,res)=>{
    let user = req.body;
    var sql  = 'UPDATE user SET name=?,email=?,age=? WHERE id=?';
    conn.query(sql,[user.name,user.email,user.age,req.params.id],(err,rows,fields)=>{
        if(!err)
            res.send("Update Item Successfully");
        else
            console.log(err);
            
    });
});