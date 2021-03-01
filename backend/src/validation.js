function existsOrError(value, msg) {
    if(!value.cliente) throw msg
    if(value.cliente === '') throw msg
    if(typeof value.cliente === 'string' && !value.cliente.trim()) throw msg
    if(!value.empresa) throw 'Empresa não pode ser vazio'
}

function existsOrErrorRegister(value, msg) {
    if(!value) throw msg
    if(typeof value.cliente === 'string' && !value.cliente.trim()) throw msg
}

function validateDate(value, msg) {
    const de = new Date(value.dataDe)
    const ate = new Date(value.dataAte)
    if(value === undefined || !value.dataDe || !value.dataAte) {
        throw msg
    }
    if(de > ate ) {
        throw msg
    }
}

module.exports = { existsOrError, validateDate, existsOrErrorRegister }