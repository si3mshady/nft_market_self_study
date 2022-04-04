import React from 'react'
import './MainContent.css'
import DataCard from '../DataCard/DataCard'
import {ChainContext} from '../../context/ChainContext'

export default function MainContent() {
    const {starterData, loadingState, setLoadingState, tokens} = React.useContext(ChainContext)
    return (

        <>
        
        { tokens.length === 0 || tokens.length === null? 
        (<main className='mainContentContainer'>
         <h1>No Appointment Tokens</h1>
        </main>): (


        <main className='mainContentContainer'>
              {tokens.map(i => (<DataCard key={i.tokenURI}  url={i.tokenURI}/>))}

              
        </main>)

        }
        </>
    )
}
