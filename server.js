const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image =  require('./controllers/image')
const db = knex({
    client: 'pg',
    connection: {
    connectionString : process.env.DATABASE_URL,
    ssl:true
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.send('it is working!!');
})

app.post('/signin', (req,res)=>{ signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req, res)=>{register.handleRegister(req,res, db, bcrypt)})

app.get('/profile/:id', (req,res)=>{profile.handleProfileGet(req,res,db)})

app.put('/image', (req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl', (req,res)=>{image.handleApiCall(req,res,)})

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port ${process.env.PORT}`);
})
// const express = require('express')
// const app = express()
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const knex = require('knex')
//
//
// const db=knex({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     user : 'postgres',
//     password : '',
//     database : 'smart-brain'
//   }
// });
//
//   db.select('*').from ('users').then(data=>{
//   console.log(data)
//
// });
//
//
//
// const database = {
//   users: [{
//     id: '123',
//     name: 'rohan',
//     email: 'example@gmail.com',
//     entries: 0,
//     joined: new Date()
//   }],
//   secrets: {
//     users_id: '123',
//     hash: 'wghhh'
//   }
// }
//
// app.use(cors());
// app.use(bodyParser.json());
// app.get('/', (req, res) => res.send('Hello World!'))
//
// app.post('/signin', (req, res) => {
//   var a = JSON.parse(req.body);
//   if (a.username === database.users[0].email && a.password === database.secrets.hash) {
//     res.send('signed in');
//   } else {
//     res.json('access denied');
//   }
// })
//
// app.post('/findface', (req, res) => {
//   database.users.forEach(user => {
//     if (user.email === req.body.email) {
//       user.entries++
//       res.json(user)
//     }
//   });
//   res.json('nope')
// })
//
//
// app.post('/register', (req, res) => {
//   const {email,name, password} = req.body
//   // database.users.push({
//   //   id: '124',
//   //   name: req.body.name,
//   //   email: req.body.email,
//   //   entries: 0,
//   //   joined: new Date()
//   // })
//   db('users').returning('*').insert({
//
//     email :email,
//     name:name,
//     joined:new Date()
//   }).then(user=>{
//     res.json(user)
//   }).catch(err=>res.status(400).JSON('unable to join'))
//
// })
//
// app.get('/profile/:id', (req, res) => {
//   const {id} = req.params
//   let found= false
//   // database.users.forEach(user => {
//   //   if (user.id === req.params.userId) {
//   //     return res.json(user);
//   //   }
//   db.select('*').from ('users').where({id:id}).then(user=>{
//     console.log(user[0])
//   })
//   // if (!found){
//   //   res.status(400).JSON('not found')
//   // }
//   })
//   // res.json('no user')
//
// })
//
// app.listen(3000, () => console.log('Example app listening on port 3000!'))
//
//
// // const express= require('express')
// // const bodyParser = require('body-parser')
// // const bcrypt = require('bcrypt-nodejs')
// // const cors = require('cors')
// // const app= express()
// // app.use(bodyParser.json())
// // app.use(cors())
// // const database = {
// //     users:[{
// //         id:'123',
// //         name:'John',
// //         email:'john@gmail.com',
// //         password:'cookies',
// //         entries:0,
// //         joined:new Date()
// //     }, {
// //         id:'124',
// //         name:'Sally',
// //         email:'sally@gmail.com',
// //         password:'bananas',
// //         entries:0,
// //         joined:new Date()
// //     }
// // ], login:[
// //     {
// //         id:'987',
// //         hash:'',
// //         email:'john@gmail.com'
//
//
// //     }
//
//
// // ]
//
//
//
// // }
// // app.get('/',(req, res)=>{
//
// //     res.send(database.users)
//
// // })
//
// // app.post('/signin',(req, res)=>{
// // //     bcrypt.compare("apples", $2a$10$sKkJgNNJ6D315uo7wlUNZeJ7bxHxwkqENo/osFRwaf7bwxpB7t3/G, function(err, res) {
// // //         //res == true
// // //         console.log('first guess', res)
// // //    });
// // //    bcrypt.compare("veggies", hash, function(err, res) {
// // //        // res = false
// // //        console.log('second guess', res)
// // //    });
//
// //     if(req.body.email===database.users[0].email &&
// //         req.body.password===database.users[0].password){
//
// //             res.json('Signin Success')
// //             // res.json(database.users[0])
// //         }else{
// //             res.status(400).json('Error logging in')
// //         }
//
//
// // })
//
// // app.post('/register',(req,res)=>{
// //     const {email, name, password} = req.body
// //     bcrypt.hash(password, null, null, function(err, hash) {
// //         // Store hash in your password DB.
// //         console.log(hash)
// //     });
// //     database.users.push({
// //         id:'125',
// //         name:name,
// //         email:email,
// //         password: password,
// //         entries:0,
// //         joined:new Date()
//
// //     })
// // res.json(database.users[database.users.length -1])
//
//
// // })
//
// // app.get('/profile/:id',(req,res)=>{
//
// //     const {id}= req.params
// //     let found= false
// //     database.users.forEach(user=>{
// //         if(user.id===id){
// //             found=true
// //            return res.json(user)
// //         }
// //     })
// //     if(!found){
// //         res.status(400).json('not found')
// //     }
//
// // })
// // app.put('/image',(req,res)=>{
// //     const {id}= req.body
// //     let found= false
// //     database.users.forEach(user=>{
// //         if(user.id===id){
// //             found=true
// //             user.entries++
// //            return res.json(user.entries)
// //         }
// //     })
// //     if(!found){
// //         res.status(400).json('not found')
// //     }
//
//
//
// // })
// // /*
// // /--> res = this is working
// // /signin --> POST success/fail
// // /register --> POST= user obj
//
//
//
// // /profile/:userId--> GET=user
// // /image --> PUT -->user
//
//
// // */
//
// // // bcrypt.hash("bacon", null, null, function(err, hash) {
// // //     // Store hash in your password DB.
// // // });
//
// // // Load hash from your password DB.
// // // bcrypt.compare("bacon", hash, function(err, res) {
// // //      //res == true
// // // });
// // // bcrypt.compare("veggies", hash, function(err, res) {
// // //     // res = false
// // // });
//
//
//
//
//
//
//
//
// // app.listen(3000, ()=>{
//
// // console.log('app is running on port 3000')
//
// // })
