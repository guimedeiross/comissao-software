import axios from 'axios'
import React, { useState } from 'react'
import './Form.css'

const baseUrl = 'http://localhost:3001'

export default () => {

    const [values, setValues] = useState({})

    const clear = event => {
        if (event) {
            event.preventDefault()
            setValues({empresa:'cairo'})
        }
    }

    const save = async e => {
        await axios.post(`${baseUrl}/register`, values)
        .then(msg => {
            const result = document.querySelector('.resultado')
            if(result.style.display === 'none'){
                result.style.display = ''
            }
            result.classList.add('alert', 'alert-success')
            result.innerHTML = msg.statusText
        })
        .catch(error => {
            if (error.response) {
                setValues({ empresa: 'cairo' })
                const result = document.querySelector('.resultado')
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
                        <label htmlFor="preco">Preço da venda ou Serviço:</label>
                        <input type="number" className="form-control" id="preco" name="preco" placeholder="Informe o valor" value={values.preco || ''} onChange={e => updateField(e)} />
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="form-group" >
                        <label htmlFor="cliente">Cliente:</label>
                        <input type="text" className="form-control" id="cliente" name="cliente" placeholder="Informe o Cliente" value={values.cliente || ''} onChange={e => updateField(e)} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label htmlFor="numeroTicket">Numero do Ticket:</label>
                        <input type="number" className="form-control" name="numeroTicket" id="numeroTicket" placeholder="Informe o número do Ticket" value={values.numeroTicket || ''} onChange={e => updateField(e)} />
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="empresa" id="Cairo" checked={values.empresa === "cairo"} value={'cairo'} onChange={e => updateField(e)} />
                            <label className="form-check-label" htmlFor="Cairo">Cairo</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="empresa" id="Webhaus"  checked={values.empresa === "webhaus"} value={'webhaus'} onChange={e => updateField(e)} />
                            <label className="form-check-label" htmlFor="Webhaus">Webhaus</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="resultado"></div>
            <div className="row d-flex justify-content-center">
                <button className="btn btn-outline-light" onClick={e => save(e) }>Salvar</button>
                <button className="btn btn-outline-danger ml-2 especifico" onClick={e => clear(e)}>Cancelar</button>
            </div>
        </div>
    )

}