const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3001, () => {
    console.log('Backend executando...')
})

app.post('/register', (req, res, next) => {
    console.log(req.body)
    res.send('Cadastrado')
    res.redirect('http://localhost:3000/#/')
})