const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const submissions = require('./controllers/submissions');
const profile = require('./controllers/profile');


process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const serverPort = process.env.PORT;
// const serverPort = 3000;

const db = knex({
    client: 'pg',
    // connection: {
    //     host : '127.0.0.1',
    //     port : 5432,
    //     user : 'postgres',
    //     password : '',
    //     database : 'recognibox',
    // }
    connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
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

app.listen(serverPort || 3000, () => {
    console.log(`App is running on port ${ serverPort }`);
})
