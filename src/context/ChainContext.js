import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { ethers } from "ethers";

import web3modal from 'web3modal'
import HealthMarket from '../artifacts/contracts/MentalHealthMarket.sol/MentalHealthMarket.json'
import ApptToken from '../artifacts/contracts/Token.sol/ElDigitalAsset.json'

import {nftTokenSmartContractAddress,nftMarketSmartContractAddress } from '../utility/config'

 import {data} from './StarterData.js'
 
 export const ChainContext = React.createContext();


 

        export const ChainProvider = ({children}) => { 
            const loadNfts = async () => {
                const provider = new ethers.providers.JsonRpcProvider()
                const tokenContract = new ethers.Contract(nftTokenSmartContractAddress, ApptToken.abi, provider)
                const marketContract = new ethers.Contract(nftMarketSmartContractAddress, HealthMarket.abi, provider)
                const results = await marketContract.getListedAppointments()
            
                let appts = await Promise.all(results.map(async (i,index) => {
            
                    let tokenURI = await tokenContract.tokenURI(i.nftTokenId)
                    const metadata = await axios.get(tokenURI)
                    const fee = await ethers.utils.formatUnits(i.fee.toString(), 'ether')
            
                    // console.log(i)
            
                    let items = {
            
                      apptId: i.apptId.toString(),
                      epochTime: i.epochTime.toString(),
                      appointmentType: i.appointmentType.toString(),
                      fee: fee,
                      image: metadata.data.image, 
                      name: metadata.data.name,
                      description: metadata.data.description,
                      nftTokenId: i.nftTokenId.toString(),
                      tokenURI
                      
                    }
                    return items
                    
                }
            
                ))
            
                setTokens(appts)
                setLoadingState(!loadingState)
            
            }

    
        const [tokens, setTokens] = useState([])
        const [loadingState, setLoadingState] = useState(false)
        const [starterData, setData] = useState([])
    
        useEffect(() => {
            // setData(data)
            loadNfts()
           
    
        },[])
       
    
        return (
            <ChainContext.Provider value={{starterData, tokens, setTokens, 
            loadingState, setLoadingState, loadNfts}}>
                {children}
            </ChainContext.Provider>
        )

}