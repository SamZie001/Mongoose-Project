require('dotenv').config();
const express = require('express')
const process = require('process')
const Person = require('./models/person')
const mongoose = require('mongoose')
const app = express()

//connect to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result=>app.listen(3001))
    .catch(err=>console.log(err))

// public files
app.use(express.static('public'))
app.set('view engine', 'ejs')

// routes
app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/all',(req,res)=>{
    Person.find()
    .then(result=>res.send(result))
    .catch(err=>console.log(err))
})

app.get('/add-db',((req,res)=>{
    const person = new Person(
        {
            name: 'Harold',
            age: 23,
            favouriteFoods: ['Spaghetti', 'Ice cream', 'French Toast']
        }
    )
    person.save()
    .then(result=>res.send(result))
    .catch(err=>console.log(err))
}))

app.get('/add-many',((req,res)=>{
    Person.insertMany([
        {
            name: 'Jace',
            age: 24,
            favouriteFoods: ['Burger', 'Chips','Coke']
        },
        {
            name: 'Ayeesha',
            age: 27,
            favouriteFoods: ['Wrapstar', 'Soda Water']
        },
        {
            name: 'Mary',
            age: 12,
            favouriteFoods: ['Pizza','Caprisun']
        },
    ])
    .then(result=>res.send(result))
    .catch(err=>console.log(err))
}))

app.get('/find-one',((req,res)=>{
    Person.find({name:'Jace'})
    .then(result=>res.send(result))
    .catch(err=>console.log(err))
}))

app.get('/find-one-food',((req,res)=>{
    Person.findOne({favouriteFoods:'Spaghetti'})
    .then(result=>res.send(result))
    .catch(err=>console.log(err))
}))

app.get('/find-id',((req,res)=>{
    Person.findById('62aa26f0175eda875ec22d5e')
    .then(result=>res.send(result))
    .catch(err=>console.log(err))
}))

app.get('/update-food',((req,res)=>{
    Person.findByIdAndUpdate('62aa26f0175eda875ec22d5d',
    {$push : {favouriteFoods: 'hamburger'}})
    .then(result=>res.send(result))
    .catch(err=>console.log(err))
}))

app.get('/findOne-update', (req,res)=>{
    Person.findOneAndUpdate({name: 'Harold'}, {$set: {age: 20}}, {new: true})
    .then(result=>res.send(result))
    .catch(err=>console.log(err))
})

app.get('/delete-one',((req,res)=>{
    Person.findByIdAndDelete('62aa2cea731d20e8729e1c07')
    .then(result=>res.send('deleted Ayeesha'))
    .catch(err=>console.log(err))
}))

app.get('/delete-all-mary',(req,res)=>{
    Person.remove({name: 'Mary'})
    .then(result=>res.send("deleted all Mary's"))
    .catch(err=>console.log(err))
})

app.get('/c-s-q',(req,res)=>{
    Person.find({favouriteFoods: 'Burrito'}).sort({name: 1}).limit(2).select("-age").exec((err,data)=>{
        if(data){
            res.send(data)
        }
        if(err){
            res.send(err)
        }
    })
})