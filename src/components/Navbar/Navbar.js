import React from 'react'
import './Navbar.css'
import {FaEthereum} from 'react-icons/fa'

export default function Navbar() {
    return (
        <div className='navContainer'>
            <FaEthereum style={{marginLeft: "30px",fontSize: "75px", color: "#2d2db1"}}/>
            <h3>Ethereum Appt Scheduler</h3>
            <a >Connect Wallet</a>
            
        </div>
    )
}
