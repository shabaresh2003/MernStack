const express = require("express")
const mongoose = require("mongoose")
const workoutRoutes = require('./routes/workouts')
const userroutes = require('./routes/user');
const app = express();

app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})
// app.use(express.urlencoded({extended:true}))

app.use('/api/workouts',workoutRoutes);
app.use('/api/user',userroutes);




mongoose.connect("mongodb+srv://shabaresh:shabaresh@cluster0.2pg6ncn.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
app.listen(4000,()=>
{
  console.log("Listeneing on port connectd to db",4000);
})
})
.catch((error)=>
{
    console.error();
})

