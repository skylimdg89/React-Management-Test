const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

const data = fs.readFileSync('./database.json')
const conf = JSON.parse(data)
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
})
connection.connect()

const multer = require('multer') // 파일 처리를 위한 lib
const upload = multer({dest: './upload/'})
//const upload = multer({dest: './upload'})

/*
*/
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './upload')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })

/*
*/

app.get('/api/customers', (req, res)=>{
    connection.query(
        "SELECT * FROM CUSTOMER",
        (err, rows, fields) => {
            res.send(rows)
        }
    )
})

app.use('/image', express.static('./upload'))
app.post('/api/customers', upload.single('image'), (req, res) =>{
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)'
    console.log(req.file)
    let image = 'http://localhost:5000/image/' + req.file.filename
    //let image =''
    let name = req.body.name
    let birthday = req.body.birthday
    let gender = req.body.gender
    let job = req.body.job
    let params = [image, name, birthday, gender, job]
    console.log(name)
    console.log(image)
    console.log(birthday)
    console.log(gender)
    console.log(job)
    connection.query(sql, params,
            (err, rows, fields) =>{
                if(err){
                    console.log(err)
                }else{
                    res.send(rows)
                }
            })
})





app.listen(port, () => console.log(`Listening on port ${port}`))
