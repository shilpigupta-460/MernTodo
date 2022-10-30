const express= require("express");
const app = express();
const cors= require('cors')
const mongoose= require('mongoose')
require('dotenv').config()
// console.log(process.env)
app.use( express.json())
 app.use(express.urlencoded({extended:false}))
app.use(cors())
app.get('/',(req,res)=>{
   res.send ("hello ji")
  })
 
  var todoRouter = express.Router();

//DB
const url = process.env.URL
mongoose.connect(url, { useNewUrlParser: true})
   .then((db) => {
        console.log("Connected to the database!");
   })
   .catch(err => {
        console.log("Cannot connect to the database!", err);
        // process.exit();
   });

   // Schema
    const todoSchema= mongoose.Schema({
       "title": String,
       "description":String,
    })
// Model
const Todo = mongoose.model('Todo', todoSchema);

 app.post('/create',(req,res)=>{
console.log(req.body);
   Todo.create({
      title:req.body.title,
      description: req.body.description
   }).then( doc=>console.log(doc))
   .catch(err=>console.log(err))
    res.json(req.body)
 })
  
 app.get('/todos',function(req,res){
   
     Todo.find().then(items=> res.json(items))
    .catch(err=>console.log(err))
 })
 app.delete('/delete/:id', (req, res)=>{
    Todo.findByIdAndDelete({ _id: req.params.id})
    .then( doc=> console.log(doc))
    .catch(err=>console.log(err) )
 })
 app.put('/update/:id', (req, res)=>{
   Todo.findByIdAndUpdate(
      {_id: req.params.id},
      {title:req.body.title,
      description: req.body.description})
   .then( doc=> console.log(doc))
   .catch(err=>console.log(err) )
})

 app.listen( 3000, ()=>{
    console.log('server is working');

 })