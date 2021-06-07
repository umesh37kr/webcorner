const express = require('express');
require('./db/conn');
const ContactUs = require('./models/usercontact')
const hbs = require('hbs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

//setting the path 
const staticpath = path.join(__dirname, '../public');
const templatepath = path.join(__dirname, '../templates/views');
const partialpath = path.join(__dirname, '../templates/partials');

//middleware
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
app.use('/jq', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))
app.set('view engine', 'hbs');
app.set("views", templatepath);
hbs.registerPartials(partialpath);

// routing routes
app.get('/', (req,res) => {
   res.render("index");
})
app.get('/contact', (req,res) => {
      res.render("contact");
 })
 app.get('/about', (req,res) => {
   res.render("about");
})
app.post('/contact', async(req,res) => {
   try {
      // res.send(req.body);
      const contactusData = new ContactUs(req.body);
      await contactusData.save();
      res.status(201).render('contact')
   } catch (error) {
      res.status(500).send(error);
   }
})
app.get('/adminData', async(req,res) => {
   //res.render("adminData");
   try {
      const contactusdata = await ContactUs.find();
      res.send(contactusdata)
   } catch (error) {
      res.send(error);
   }
})
// creating server
app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`)
})