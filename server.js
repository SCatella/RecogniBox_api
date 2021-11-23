const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const submissions = require('./controllers/submissions');
const profile = require('./controllers/profile');


const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-vertical-81645',
    port : 5432,
    user : 'postgres',
    password : '',
    database : 'recognibox'
  }
});

const app = express();


app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is operational.');
})

app.post('/signin', signin.handleSignIn(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', profile.handleProfileGet(db));

app.put('/submissions', submissions.handleSubmissions(db));
app.post('/submissionsurl', submissions.handleApiCall());

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${ process.env.PORT }`);
})
