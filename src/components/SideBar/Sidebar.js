import React from 'react'
import './Sidebar.css'
import {FaRegUser, FaRegPlusSquare,FaSearchengin} from 'react-icons/fa'

export default function Sidebar() {
    return (
            <aside className='sideBarContainer'>
            <ul className='ul_container'>                
                <li>
                <FaRegUser style={{fontSize: "50px",color:"#2d2db1"}}/>
                </li>
                <li>
                <FaRegPlusSquare style={{fontSize: "50px", color: "#2d2db1"}}/>
                </li>
                <li>
                <FaSearchengin style={{fontSize: "50px",color:"#2d2db1"}} /> 
                </li>
               
            </ul>
        </aside>
    )
}
