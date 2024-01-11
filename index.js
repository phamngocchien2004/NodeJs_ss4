const express = require('express');
const mysql = require('mysql2');
const ejs = require('ejs');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Testing_System_2'
})

// db.connect((err)=>{
//     if(err){
//         console.error('Khong ket noi duoc',err);
//         throw err;
//     }
//     console.log('Da ket noi duoc toi Mysql');
// });

//Read data
app.get('/', (req, res) => {
  const sqlhienthi = "SELECT * FROM Testing_System_2.Account";
  db.query(sqlhienthi, (err, ketqua)=>{
    if(err){
        console.error('Loi khog truy van duoc',err);
        res.send("Loi khong truy van");
    }
    else{
        res.render('index',{account : ketqua});
    }
  }); 
});
app.get('/addaccount',(req,res)=>{
    res.render('addaccount')
})
// add account
app.post('/addaccount', (req,res)=>{
    const {email,username,fullname,departid,postid,createdate} = req.body;
    const sqlcreate = "INSERT INTO Account( Email , Username , FullName , DepartmentID , PositionID, CreateDate) VALUES (?,?,?,?,?,?)";
    db.query(sqlcreate,[email,username,fullname,departid,postid,createdate],(err,ketqua)=>{
        if(err){
            console.error('k adđ đc',err);
           
        }
        else{
            res.redirect('/');
        }
    })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})