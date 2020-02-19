const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')
const formData = require('express-form-data')
const AuthRoutes = require('./routes/AuthRoutes')
const NewsRoutes = require('./routes/NewsRoutes')

const app = express()

app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))

const options = {
    uploadDir:'uploads'
}
app.use(formData.parse(options))
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.use('/api/auth',AuthRoutes)
app.use('/api/news',NewsRoutes)

const PORT = config.get('port') || 5000

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}
async function start(){
    try{
        await mongoose.connect('mongodb+srv://vadim:hp61rTkCrzLDqArs@cluster0-a53r8.mongodb.net/blog?retryWrites=true&w=majority' || config.get('mongoUri'),{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        })
        app.listen(PORT,()=> console.log('Server started on port',PORT))
    }catch(e){
        console.log('Error',e.message)
        process.exit(1)
    }
}

start()