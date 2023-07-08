const mongoose = require('mongoose')

function ConnectDB(){
    mongoose.connect('mongodb://127.0.0.1:27017/CRUD_API')
    .then(()=>{
        console.log('Connected to MongoDB')
    }).catch((error)=>{
        console.log(error)
    })
}

function hello(){
    console.log('halo world')
}

module.exports = {
    ConnectDB,
    hello
}