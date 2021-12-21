const express=require('express');
const cors=require('cors');

const app=express();
const PORT=5000;

// SOL2: enable CORS
// app.use(cors());

app.get('/',(req,res)=>{
	res.send("Welcome to CORS server! 😁")
})
app.get('/candy',(req,res)=>{
  // SOL1: use direct setting CORS
  // res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.json({'candy':'bubble-gum'})
})
app.listen(PORT,()=>console.log(`server running on port ${PORT}`))
