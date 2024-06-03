const express = require('express');
const bodyParser = require('body-parser');
const { connectToMongo,  connectToMongomess,  connectToMongologin} = require('./db');

const app = express();
const port = 3000;
const link = 'http://127.0.0.1:5500/web'
app.use(bodyParser.urlencoded({ extended: true }));

let collection;
let messcollection;
let logincollection;

connectToMongo()
  .then(col => {collection = col;})
  .catch(error => {console.error('Error connecting to MongoDB:', error);});

connectToMongomess()
.then(col1 => {messcollection = col1;})
.catch(error => {console.error('Error connecting to MongoDB:', error);});


connectToMongologin()
.then(col2=>{logincollection = col2;})
.catch(error=>{console.error('Error connecting to MongoDB: ', error);});


app.post('/appointment_form', async (req, res)=>{
    const username = req.body.fullname;
    const email = req.body.email;
    const phone = req.body.phone;
    const healthIssue = req.body.health_issue;
    const preferedDateTime = req.body.preferred_date_time;
    const userDetails = {
        username: username,
        email: email,
        phone: phone,
        healthIssue: healthIssue,
        preferedDateTime: preferedDateTime,
    };

    await collection.insertOne(userDetails);
    res.redirect(`${link}/success.html`);
});

app.post('/message_form', async (req,res)=>{
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;
  const messageDetails = {
    name: name,
    email: email,
    subject: subject,
    message: message,
  };
  await messcollection.insertOne(messageDetails);
  res.redirect(`${link}/message.html`);
});
app.post('/signup_form', async (req, res)=>{
  const username = req.body.username;
  const password = req.body.password;
  const signupDetails = {
    username: username,
    password: password,
  };

  await logincollection.insertOne(signupDetails);
  res.redirect(`${link}/UI.html`);
});
  app.post('/login_form', async (req, res)=>{
    const username = req.body.username;
    const password= req.body.password;

  try {
    if (!logincollection) {
      res.status(500).send('MongoDB connection not established');
      return;
    }
    const user = await logincollection.findOne({ username: username, password: password });
    if (user) {
      res.redirect(`${link}/UI.html`);
    } 
    else {
      res.send(`<script>
              alert('Username or Password is incorrect!!');
              window.location.href = '${link}/login.html';
            </script>`);

    }
  } catch (error) {
    console.error('Error occurred while verifying login:', error);
    res.status(500).send('Internal Server Error');
  }
  
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});