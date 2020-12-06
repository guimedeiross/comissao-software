import React from 'react'
import './Main.css'
import Form from './Form'
import Header from './Header'

export default props =>
    <React.Fragment>
        <Header {...props}/>
        <main className="main container-fluid">
            <div className="p-3 mt-3">
                <Form />
            </div>
        </main>
    </React.Fragment>