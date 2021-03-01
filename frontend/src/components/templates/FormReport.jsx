import axios from 'axios'
import React, { useState } from 'react'
import './FormReport.css'

const baseUrl = 'http://localhost:3001'

export default () => {

    const [values, setValues] = useState({})

    const clear = event => {
        document.querySelector("table").style.display = "none"
        if (event) {
            event.preventDefault()
            setValues({ empresa: 'cairo' })
        }
    }

    const montarTabela = dados => {
        const table = document.querySelector("#tabelaCorpo")
        document.querySelector("table").style.display = "table"
        const rodape = document.querySelector("tfoot th")
        let total = 0
        dados.map(e => {
            table.insertAdjacentHTML('beforebegin', `<tr><th scope="col">${e.cliente}</th><th scope="col">${e.empresa}</th>
            <th scope="col">${e.numeroTicket}</th><th scope="col">${e.preco} R$</th><th scope="col">${new Date(e.created_at).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</th></tr>`)
            total += e.preco
        })
        rodape.innerHTML = `<th>Total: ${total} R$</th>`
    }

    const save = async e => {
        await axios.post(`${baseUrl}/reports`, values)
            .then(msg => {
                if(document.querySelector('tbody tr') !== null)
                else montarTabela(msg.data)
            })
            .catch(error => {
                if (error.response) {
                    setValues({ empresa: 'cairo' })
                    const result = document.querySelector('.resultadoErro')
                    result.style.display = ''
                    result.classList.add("alert", "alert-warning")
                    result.setAttribute("role", "alert")
                    result.innerHTML = error.response.data
                    const timer = () => {
                        const t = setInterval(() => {
                            result.style.display = 'none'
                        }, 5000)
                        return t
                    }
                    timer()
                    clearInterval(timer())
                }
            })

    }

    const updateField = e => {
        if (e) {
            const newValues = { ...values }
            newValues[e.target.name] = e.target.value
            setValues(newValues)
        }
    }

    return (
        <div className="form">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="form-group" >
                        <label htmlFor="dataDe">De:</label>
                        <input type="date" className="form-control" id="dataDe" name="dataDe" value={values.dataDe || ''} onChange={e => updateField(e)} />
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="form-group" >
                        <label htmlFor="dataAte">Até:</label>
                        <input type="date" className="form-control" id="dataAte" name="dataAte" value={values.dataAte || ''} onChange={e => updateField(e)} />
                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-12 col-md-6">
                    <div className="form-group" >
                        <label htmlFor="cliente">Cliente:</label>
                        <input type="text" className="form-control" id="cliente" name="cliente" value={values.cliente || ''} onChange={e => updateField(e)} />
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="empresa" id="Cairo" defaultChecked={values.empresa === "cairo"} value={'cairo'} onClick={e => updateField(e)} />
                            <label className="form-check-label" htmlFor="Cairo">Cairo</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="empresa" id="Webhaus" defaultChecked={values.empresa === "webhaus"} value={'webhaus'} onClick={e => updateField(e)} />
                            <label className="form-check-label" htmlFor="Webhaus">Webhaus</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="resultadoErro"></div>
            <table className="resultado table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col" className="p-4">Cliente</th>
                        <th scope="col" className="p-4">Empresa</th>
                        <th scope="col">Numero <br/>do Ticket</th>
                        <th scope="col" className="p-4">Preço</th>
                        <th scope="col" className="p-4">Data</th>
                    </tr>
                </thead>
                <tbody id="tabelaCorpo">

                </tbody>
                <tfoot>
                    <tr>
                        <th scope="col">Total: </th>
                    </tr>
                </tfoot>
            </table>

            <div className="row d-flex justify-content-center">
                <button className="btn btn-outline-light" onClick={e => save(e)}>Gerar</button>
                <button className="btn btn-outline-danger ml-2 especifico" onClick={e => clear(e)}>Cancelar</button>
            </div>
        </div>
    )

}