import React, { Component } from 'react'
import './Form.css'
import axios from 'axios'

const baseUrl = 'http://localhost:3001'

const initialState = {
    campos: {
        preco: '',
        cliente: '',
        numeroTicket: '',
        empresa: ''
    }
}

export default class Form extends Component {

    state = { ...initialState }

    clear() {
        this.setState({ ...initialState.campos })
    }

    save() {
        axios.post(`${baseUrl}/register`)
    }

    updateField(e) {
        const campos = { ...this.state }
        campos[e.target.name] = e.target.value
        this.setState({ campos })
    }

    render() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group" >
                            <label htmlFor="preco">Preço da venda ou Serviço:</label>
                            <input type="number" className="form-control" id="preco" name="preco" placeholder="Informe o valor" onChange={e => this.updateField(e)} />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group" >
                            <label htmlFor="cliente">Cliente:</label>
                            <input type="text" className="form-control" id="cliente" name="cliente" placeholder="Informe o Cliente" onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="numeroTicket">Numero do Ticket:</label>
                            <input type="number" className="form-control" name="numeroTicket" id="numeroTicket" placeholder="Informe o número do Ticket" onChange={e => this.updateField(e)} />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="empresa" id="Cairo" onChange={e => this.updateField(e)} defaultChecked />
                                <label className="form-check-label" htmlFor="Cairo">Cairo</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="empresa" id="Webhaus" value="webhaus" onChange={e => this.updateField(e)}  />
                                <label className="form-check-label" htmlFor="Webhaus">Webhaus</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <button className="btn btn-outline-light" onClick={() => this.save()}>Salvar</button>
                    <button className="btn btn-outline-danger ml-2 especifico" onClick={() => this.clear()}>Cancelar</button>
                </div>
            </div>
        )
    }

}