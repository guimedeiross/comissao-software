const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { existsOrError, validateDate, existsOrErrorRegister } = require('./validation')
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
        existsOrErrorRegister(valores.preco, 'Preco não pode ser vazio')
        existsOrErrorRegister(valores.cliente, "Cliente não pode ser vazio")
        existsOrErrorRegister(valores.numeroTicket, "Numero do Ticket não pode ser vazio")
        await db('infoComissao').insert(valores)
        res.status(201).send()
    } catch (msg) {
        res.status(400).send(msg)
    }
})

app.post('/reports', async (req, res) => {
    const valores = req.body
    try {
        if (valores.cliente !== '') {
            validateDate(valores, 'Data não pode estar vazio ou <br>Data "até" não pode ser menor que a data "De"')
            existsOrError(valores, "Cliente não pode ser vazio")
            const result = await db.select('*').from('infoComissao')
                .where({ cliente: valores.cliente })
                .andWhere({ empresa: valores.empresa })
                .andWhereBetween('created_at', [new Date(valores.dataDe).toLocaleDateString('pt-BR', {timeZone: 'UTC'}), new Date(valores.dataAte).toLocaleDateString('pt-BR', {timeZone: 'UTC'})])
            res.status(200).json(result)
        } else {
            const result2 = await db.select('*').from('infoComissao')
                .where({ empresa: valores.empresa })
            res.status(200).json(result2)
        }
    } catch (msg) {
        res.status(400).send(msg)
    }

})