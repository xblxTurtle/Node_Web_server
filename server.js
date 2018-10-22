'use strict';
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('currentYear', () => { return new Date().getFullYear(); });
hbs.registerHelper('uppercase', (text) => { return text.toUpperCase(); });
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, resp, next) => {
  fs.appendFile('server.log',
    `Time: ${new Date().toString()},
  URL: ${req.url} ,
  Request: ${req.method}, 
  Response: ${resp.statusCode} \n`,
    (err) => {
      if (err) {
        console.log(`Error writing to log file: ${err}`);
      }
    });
  next();
});
// app.use((req,resp,next)=>{
//   resp.render('maintenance.hbs');
// });

app.get('/', (req, resp) => {
  console.log('Request to /');
  resp.render('home.hbs', {
    title: 'Home page title',
    welcome: 'Welcome message',
  });
});

app.get('/test', (req, resp) => {
  resp.render('test.hbs');
});

app.get('/about', (req, resp) => {
  resp.render('about.hbs', {
    title: 'About page title',
  });
});

app.get('/projects', (req, resp) => {
  resp.render('projects.hbs', {
    title: 'Projects page title',
  });
});

app.get('/bad', (req, resp) => {
  resp.send({error: 'Unable to process request.'});
});

app.listen(port, function () {
  console.log(`Listening to port ${port}`);
} );

module.exports = app;
