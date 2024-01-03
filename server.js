const express = require('express');
const user = require('./routes/user');
const admin = require('./routes/admin')
const mongoose = require('mongoose');
require('dotenv').config();


const server = express();
server.use(express.json());


server.use('/user',user)
server.use('/admin',admin )

server.get('/',(req,res)=>{
    console.log('started')
    res.status(200).send('good')
})

async function start(){
    try{
        await mongoose.connect(process.env.MONGOOSE_URI)
        console.log('database connected')
    }catch(error){
        console.log('error while connecting database: ',error);
    }
    
    server.listen(process.env.PORT,console.log(`server started at port:${process.env.PORT}`));
}


start()
