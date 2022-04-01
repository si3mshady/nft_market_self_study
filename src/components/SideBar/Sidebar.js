import React from 'react'
import './Sidebar.css'
import {FaRegUser, FaRegPlusSquare,FaSearchengin} from 'react-icons/fa'
import {Link} from 'react-router-dom'


export default function Sidebar() {
    return (
            <aside className='sideBarContainer'>
            <ul className='ul_container'>                
                <li>
                <Link to='/'>
                <FaRegUser style={{fontSize: "50px",color:"#2d2db1"}}/>
                </Link>
                </li>
                <li>

                 <Link to='/new'>
                     <FaRegPlusSquare style={{fontSize: "50px", color: "#2d2db1"}}/>
                 </Link>   
                
                </li>
                <li>
                <Link to='/view'>
                     <FaSearchengin style={{fontSize: "50px",color:"#2d2db1"}} /> 
                </Link>
              
                </li>
               
            </ul>
        </aside>
    )
}
