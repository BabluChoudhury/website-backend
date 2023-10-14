import './DB/conn.js'
import express from 'express'
import bcrypt from 'bcrypt'
import { con } from './DB/conn.js';
const app = express();
const port=process.env.PORT || 3000;
app.use(express.json());
app.get("/users",(req,res)=>{
    con.query("select * from usertable",(err,result)=>{
        if(err){
            res.status(500).send("Internal Server error");
        }
        res.status(200).send(result);
    })
})
app.post("/signup",async(req,res)=>{
    try{
        const {name,email,username,password} =req.body;
        const hpassword=await bcrypt.hash(password,10);
        const data=[name,email,username,hpassword]
        con.query("insert into usertable(name,email,username,password) values ?"[data],(err,result)=>{
            if(err){
                res.status(500).send("An error occurred during registation");
            }
            res.status(201).send("Register successfully");
        })
    }catch(e){
        res.status(500).send("An error occurred during registation");
    }
})
app.post("/login",async(req,res)=>{
    try{
        const {username, password} =req.body;
        con.query("Select * from usertable where username=?",[username],async (err,result)=>{
            if(err){
                res.status(500).send("An error occurred during login");
            }
            if(result.length ===0){
                res.status(404).send("Invalid username and password");
            }
            const user=result[0];
            const validPassword= await bcrypt.compare(password,user.password);
            if(!validPassword){
                res.status(404).send("Invalid username and password");
            }
        })
    }
    catch(e){
        res.status(500).send("An error occurred during login");
    }
})
app.listen(port,()=>{
    console.log(`server run at https://localhost:${port}`);
})