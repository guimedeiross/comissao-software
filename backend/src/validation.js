function existsOrError(value, msg) {
    if(!value) throw msg
    if(typeof value === 'string' && !value.trim()) throw msg
}

function validateDate(value, msg) {
    
}

module.exports = { existsOrError }