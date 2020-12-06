import React from 'react'
import './Nav.css'
import NavItem from './NavItem'

export default props =>
    <aside className='menu-area'>
        <nav className="menu">
            <NavItem link="/" label="Início" />
            <NavItem link="/reports" label="Relatórios"/>
        </nav>
    </aside>
