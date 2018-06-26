const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
var app = express();


hbs.registerPartials(__dirname + '/views/partials')
//create view engine with hbs
app.set('view engine','hbs');


//middleware
app.use(express.static(__dirname +'/public/'));

//helper
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('Capit',(text)=>{
  return text.toUpperCase();
});
app.use((req,res,next)=>{
  var now = new Date().toString();
  console.log(`${now}: ${req.method} ${req.url}`);
  next();
})
app.use((req,res,next)=>{
  res.render('maintanence.hbs');
});

//home
app.get('/',(req,res)=>{
  res.render('home.hbs',{pagetitle:'Home Page',welcome:"Welcome to coaching on node.js"});
})
app.get('/about',(req,res)=>{
  res.render('about.hbs',{pagetitle:'About Page',subject:'node.js'});
});
//bad request json
app.get('/bad',(req,res)=>{
  res.send(
    {
      Errormessage:'A bad request is made cant send appropriate response',
    }
  );
});
app.listen(port,()=>{
  console.log(`Server is up and running on port ${port}`);
});
