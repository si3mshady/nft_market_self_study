import React from 'react'
import './MainContent.css'
import DataCard from '../DataCard/DataCard'
import {ChainContext} from '../../context/ChainContext'


export default function MainContent() {
    const {starterData, loadingState, setLoadingState, tokens} = React.useContext(ChainContext)
    return (

        <>
        
        { tokens.length == 0 ? 
        (<main className='mainContentContainer'>
         <h1>No Appointment Tokens</h1>
        </main>): (


        <main className='mainContentContainer'>
              {starterData.map(url => (<DataCard key={url}  url={url}/>))}
        </main>)

        }
        </>
    )
}
