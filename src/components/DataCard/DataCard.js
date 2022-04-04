import React from 'react'
import './DataCard.css'

import {ChainContext} from '../../context/ChainContext'

export default function Datacard({url}) {
    const {starterData, loadingState, setLoadingState,buyNft, tokens} = React.useContext(ChainContext)
    return (
        <div className='dataCard'>

            <div className='dataCard_Container'> 

                        <div>
                        <img src={url} />
                        
                        </div>
                        <button  onClick={buyNft} className='button_green'>Add Appt</button>

            </div>

             
            
        </div>
    )
}
