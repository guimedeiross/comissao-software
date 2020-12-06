import React from 'react'
import './Header.css'

export default props =>
    <header className="header d-none d-sm-flex flex-column">
        {props.title}
    </header>