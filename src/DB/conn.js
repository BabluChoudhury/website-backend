import mysql from 'mysql';
export const con=mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"",
    database:"userdetails"
});
con.connect((err)=>{
    if(!err){
        console.log("Connected");
    }
    else{
        console.log("Not Connected");
    }
})