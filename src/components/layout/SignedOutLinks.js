import React from 'react'
import { NavLink } from 'react-router-dom'

const SingnedOutLinks = () => {
    return (
        <div className="right">
            <li><NavLink to="/signup" style={{color: '#253858'}}>Criar conta</NavLink></li>
            <li><NavLink to="/signin" style={{color: '#253858'}}>Login</NavLink></li>
        </div>
    )
}

export default SingnedOutLinks