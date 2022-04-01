import React from 'react'
import './MainContent.css'
import DataCard from '../DataCard/DataCard'
import {ChainContext} from '../../context/ChainContext'




export default function MainContent() {
    const {starterData} = React.useContext(ChainContext)
    return (
        <main className='mainContentContainer'>
              {starterData.map(url => (<DataCard key={url}  url={url}/>))}
        </main>
    )
}
