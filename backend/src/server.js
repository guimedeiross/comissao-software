const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { existsOrError } = require('./validation')
const db = require('./db')
const app = express()

app.use(cors())
app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3001, () => {
    console.log('Backend executando...')
})

app.post('/register', async (req, res) => {
    const valores = req.body
    try {
        existsOrError(valores.preco, "Preco não pode ser vazio")
        existsOrError(valores.cliente, "Cliente não pode ser vazio")
        existsOrError(valores.numeroTicket, "Numero do Ticket não pode ser vazio")
        await db('infoComissao').insert(valores)
        res.status(201).send()
    } catch (msg) {
        res.status(400).send(msg)
    }
})

app.post('/reports', async (req, res) => {
    const valores = req.body
    console.log(valores.empresa)
    //console.log(new Date(valores.dataDe.replace(/-/g, '/')).toLocaleDateString())
    // new Date(valores.dataAte.replace(/-/g, '/'))
    try {
        if(valores.cliente !==''){
            existsOrError(valores.cliente, "Cliente não pode ser vazio")
            const result = await db.select('*').from('infoComissao')
                .where({ cliente: valores.cliente })
                .andWhere({ empresa: valores.empresa })
            res.status(200).send(result)
        }
        console.log(valores.empresa)
        const result2 = await db.select('*').from('infoComissao')
                .where({ empresa: valores.empresa })
                //console.log(result2)
            //res.status(200).send(result2)
    } catch (msg) {
        res.status(400).send(msg)
    }
})