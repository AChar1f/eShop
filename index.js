import express from "express";
import path from "path";
import { connection as db } from "./config/index.js" // comes from config index variables
import { reverse } from "dns";
import {hash } from 'bcrypt'
import { createToken } from "./middleware/AuthenticateUser.js";
import bodyParser from "body-parser";

// Create an Express App
const app = express()
const port = +process.env.PORT || 4000
const router = express.Router()

// Middleware
app.use(router, 
  express.static("./static"),
  express.json(),
  express.urlencoded({
    extended: true
}))
router.use(bodyParser.json())
// Endpoint
router.get("^/$|/eShop", (req, res) => {
  res.status(200).sendFile(path.resolve("./static/html/index.html"))
})
router.get("/users", (req, res) => {
  try {
    const strQry = `
        select firstName, lastName, age, emailAdd
        from Users;
        `
    db.query(strQry, (err, results) => {
      if (err) throw new Error(`Issue when retrieving all users`)
      res.json({
        status: res.statusCode,
        results     // Or you can use results: results
      })
    })
  } catch (e) {
    res.json({
        status: 404,
        msg: e.message
    })
  }
})
router.get('/user/:userID', (req, res) => {
  try{
    const strQry = `
    select userID, firstName, lastName, age, emailAdd
    from Users where userID = ${req.params.userID};
    `
    db.query(strQry, (err, result) => {
      if (err) throw new Error('Issue when retrieving user data.')
      res.json({
    status: res.statusCode,
    result: result[0]
      })
    })
  } catch (e) {
    res.json({
      status: 404,
      msg: e.message
    })
  }
})
router.get('*', (req, res) => {       // any endpoint that we did not create will return this.
  res.json({
    status: 404,
    msg: 'Resource not found'
  })
})
router.post('/register', bodyParser.json(),  async (req, res) => {
  try {
    let data = req.body
      data.pwd = await hash(data.pwd, 12)
//Payload
let user = {
  emailAdd: data.emailAdd,
  pwd: data.pwd
} 
let strQry = `
insert into  Users
set ?;
`
 db.query(strQry, [data], (err) => {
  if(err) {
    res.json({
      status: res.statusCode,
      msg: 'This email has already been taken'
    })
  } else {
    const token = createToken(user)
    res.json({
      token,
      msg: 'You are now registered'
    })
  }
 })   
  } catch (e) {
    res.json({
      status: 404,
      msg: e.message
    })
  }
})
router.patch('/user/:id', async (req, res) => {
  try {
    let data = req.body
    if (data.pwd) {
      data.pwd = await hash(data.pwd, 12)
    }
    const strQry = `
    update Users
    set ?
    where userID = ${req.params.id}
    `
    db.query(strQry, [data], (err) => {
      if (err) throw new Error('Unable to update user')
        res.json({
          status: res.statusCode,
          msg: 'User details updated successfully 🔃'
        })
    })
  } catch (e) {
    res.json({
      status: 404,
      msg: e.message
    })
  }

})
app.listen(port, () => {
  console.log(`Ayo, We live on Port ${port}`)
})