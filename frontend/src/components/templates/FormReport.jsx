import React, { useState, useEffect } from 'react'
import './FormReport.css'
import axios from 'axios'

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
        await axios.post(`${baseUrl}/reports`, values)
        .then(msg => { 
            const result = document.querySelector('.resultado')
            result.classList.add('alert', 'alert-success')
            result.innerHTML = msg.statusText
        })
        .catch(msg => {
            const result = document.querySelector('.resultado')
            result.classList.add('alert', 'alert-warning')
            result.innerHTML = 'Verificar campos'
        })
            
    }

    const updateField = e => {
        if (e) {
            const newValues = { ...values }
            newValues[e.target.name] = e.target.value
            setValues(newValues)
        }
    }
    useEffect(()=>{
        const v = { ...values }
        v.empresa = 'cairo'
        setValues(v)
    }, [])

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