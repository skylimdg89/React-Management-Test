const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/api/customers', (req, res)=>{
    res.send([
        {
            'id':1,
            'image': 'https://placeimg.com/64/64/1',
            'name': 'Geralt',
            'birthday':'89',
            'gender': 'male',
            'job': 'Witcher'
            },
            {
            'id':2,
            'image': 'https://placeimg.com/64/64/2',
            'name': 'Triss',
            'birthday':'93',
            'gender': 'female',
            'job': 'Sorceress'
            },
            {
            'id':3,
            'image': 'https://placeimg.com/64/64/3',
            'name': 'Yen',
            'birthday':'91',
            'gender': 'female',
            'job': 'sorceress'
            }
    ])
})

app.listen(port, () => console.log(`Listening on port ${port}`))
