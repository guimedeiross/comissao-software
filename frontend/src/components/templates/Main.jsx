import React from 'react'
import './Main.css'
import Form from './Form'
import Header from './Header'
import FormReport from './FormReport'


function RenderForm(props) {
    const form = props.controle;
    if (form.title === "Relatórios") {
        return <FormReport />
    }
    return <Form />;
}


export default props =>
    <React.Fragment>
        <Header {...props}/>
        <main className="main container-fluid">
            <div className="p-3 mt-3">
                <RenderForm controle={{...props}} />
            </div>
        </main>
    </React.Fragment>