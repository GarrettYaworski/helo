require('dotenv').config()
const express = require('express')
const { json } = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const passport = require('passport');
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, '../build')))
app.use(json())


massive(process.env.CONNECTION_STRING)
  .then(db => { app.set('db', db) })
  .catch(err => console.log(err))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3 * 60 * 1000
  }
})
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((profile, done) => {
  console.log(profile)
  const db = app.get('db');
  db.get_user_by_authid(profile.id).then(user => {
    if (!user[0]) {
      db.add_user_by_authid(profile.id)
        .then(response => {
          return done(null, response[0]);
        })
        .catch(err => console.log(err));
    } else {
      return done(null, user[0]);
    }
  });
});


passport.deserializeUser((user, done) => {
  done(null, user);
});


app.get('/api/:id', (req, res) => {
  const db = req.app.get('db')
  console.log(req.params.id)
  db.get_user_info(req.params.id)
  .then(response => {
    console.log(response)
    res.send(response).status(200)})
  .catch(err => console.log(err))
})

app.post('/api/sesh', (req, res) => {
  const db = req.app.get('db')
  db.get_user_info_by_name(req.query.user)
  .then(response => {
    req.session.user = response[0]
    res.send(req.session.user)})
  .catch(err => console.log(err))
})

app.get('/api/transactions/:id', (req, res) => {
  const db = req.app.get('db')
  db.get_user_transactions(req.params.id)
  .then(response => {
    res.send(response)
    console.log(response)})
  .catch(err => console.log(err))
})

app.get('/api', (req, res) => {
  console.log(req.session)
})



app.listen(process.env.SERVER_PORT, () => console.log(`listening on port ${process.env.SERVER_PORT}`))

//Pull request