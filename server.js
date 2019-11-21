'use srict';
// load the dependeces

const express = require('express');
const cors =require('cors');
const pg=require('pg');
require('dotenv').config();

// application setup

const app =express();

app.use(cors());
const PORT= process.env.PORT || 3001


const client= new pg.Client(process.env.DATABASE_URL)
client.on('error',(error)=>console.error(error));
// routes

app.get('/test',(req,res)=>{
    res.status(200).send('hello');
})

app.get('/add',(req,res)=>{
    let firstName=req.query.first;
    let lastName=req.query.last;

    let SQL ='INSERT INTO people (first_name,last_name) VALUES($1,$2)'
    let safeValues=[firstName,lastName];
    client.query(SQL,safeValues)
    .then(results=>{
        res.status(200).json(results);
    })
    .catch(error=>{
        res.status(500).send(error)
    })
})

app.get('/tabl',(req,res)=>{
    let SQL ='SELECT * FROM people';
    client.query(SQL)

    .then(results=>{
        res.status(200).json(results.rows)
    })


    .catch((error)=>{
        res.status(500).send(error)
    })
    
   

    });




// error and not found
app.get('*',(req,res)=>{
res.status(404).send('NOT FOUND!')
});

app.use((error,req,res)=>{
    res.status(500).send(error)
});


// listining 
client.connect()
.then(()=>{
app.listen(PORT,()=> console.log(`I am listining at port ${PORT}`)
)}
)