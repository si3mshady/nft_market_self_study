import React from 'react'
import './DataCard.css'
export default function Datacard({url}) {
    return (
        <div className='dataCard'>

            <div className='dataCard_Container'> 

                        <div>
                        <img src={url} />
                        
                        </div>
                        <button className='button_green'>Add Appt</button>

            </div>

             
            
        </div>
    )
}
