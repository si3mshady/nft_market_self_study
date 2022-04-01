import React, { useEffect, useState} from 'react'


 import {data} from './StarterData.js'
 
 export const ChainContext = React.createContext();


export const ChainProvider = ({children}) => { 

        const [starterData, setData] = useState([])
    
        useEffect(() => {
            setData(data)
           
    
        },[])
       
    
        return (
            <ChainContext.Provider value={{starterData}}>
                {children}
            </ChainContext.Provider>
        )

}