const express=require('express')
const app=express();
const cors=require('cors')
const bodyParser=require('body-parser');
const mysql=require('mysql2');

const port=5000;

// DB Connection
const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'crud_app'
})

// Middlewares
app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));



/**********************Routes****************************/
// 1.Get all the data
app.get('/api/get',(req,res)=>{
    const sqlGet="SELECT * FROM contact_db";
    db.query(sqlGet,(err,result)=>{
        res.send(result);
    })
})

// 2.Add a new User
app.post('/api/post',(req,res)=>{
    const {name,email,contact}=req.body;
    const sqlInsert="INSERT INTO contact_db (name,email,contact) VALUES(?,?,?) ";
    db.query(sqlInsert,[name,email,contact],(err,result)=>{
       if(err)
       {
        console.log(err)
       }
    })
})

// 3.Delete a  User
app.delete('/api/remove/:id',(req,res)=>{
    const {id}=req.params;
    const sqlRemove="DELETE FROM contact_db WHERE id= ? ";
    db.query(sqlRemove,id,(err,result)=>{
       if(err)
       {
        console.log(err)
       }
    })
})

// 4.Get user Details for individual 
app.get('/api/get/:id',(req,res)=>{
    const {id}=req.params;
    const sqlGet="SELECT * FROM contact_db WHERE id=?";
    db.query(sqlGet,id,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        res.send(result);
    })
})

//5. Update User
app.put('/api/update/:id',(req,res)=>{
    const {id}=req.params;
    const {name,email,contact}=req.body;
    const sqlUpdate="UPDATE contact_db SET name=?,email=?,contact=? WHERE id=?";
    db.query(sqlUpdate,[name,email,contact,id],(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        res.send(result);
    })
})


// 5.View Data


app.listen(port,()=>{
    console.log(`Server working at port ${port}`)
})