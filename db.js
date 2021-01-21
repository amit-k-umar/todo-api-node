const utils=require('util')
const mysql= require('mysql')

let pool = mysql.createPool({
    host:process.env.HOST,
    port:process.env.DB_PORT,
    ssl:true,
    user: process.env.user,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

pool.getConnection((err,connection)=>{
    if(err){
        console.log(err);
    } else console.log("Connected");
    if(connection) connection.release();
    return;
});

pool.query=utils.promisify(pool.query);
module.exports=pool;