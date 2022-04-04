import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { ethers } from "ethers";

import Web3modal from 'web3modal'
import HealthMarket from '../artifacts/contracts/MentalHealthMarket.sol/MentalHealthMarket.json'
import ApptToken from '../artifacts/contracts/Token.sol/ElDigitalAsset.json'

import {nftTokenSmartContractAddress,nftMarketSmartContractAddress } from '../utility/config'

 import {data} from './StarterData.js'
 
 export const ChainContext = React.createContext();


        export const ChainProvider = ({children}) => { 

            const buyNft = async (token) => {

                const web3modal = new Web3modal()
                const connection = await web3modal.connect()
                const provider =  await new ethers.providers.Web3Provider(connection)
                const signer = provider.getSigner()
                const marketContract = new ethers.Contract(nftMarketSmartContractAddress, HealthMarket.abi, signer)
                const fee = ethers.utils.parseUnits(tokens.price.toString(), 'ether')
                const tx = await HealthMarket.createMarketSale(token, ApptToken, {value: fee}) 
                await tx.wait()
                loadNfts() 
                return (

                    <div className='main_container' style={{display: 'flex'}}>

                                <div className='main_container level1'  style={{display: 'flex'}}>


                                            <div className='main_container level2'>

                                                    {data.map((nft, i) => {
                                                        console.log(nft)
                                                    }) }

                                            </div>                                                        
                                </div>

                    </div>
                )
            }



            const loadNfts = async () => {
                console.log('Loading Nfts....')

                const accounts = await window.ethereum.request({method: 'eth_accounts'});


                const provider = new ethers.providers.Web3Provider(window.ethereum)
                // https://rpc-mumbai.matic.today"
                // const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.matic.today")


                const tokenContract = new ethers.Contract(nftTokenSmartContractAddress, ApptToken.abi, provider)
                const marketContract = new ethers.Contract(nftMarketSmartContractAddress, HealthMarket.abi, provider)
                const results = await marketContract.getAllAppts()

                console.log(results)
                
                try { let appts = await Promise.all(results.map(async (i,index) => {
            
                    let tokenURI = await tokenContract.tokenURI(i.nftTokenId)
                    const metadata = await axios.get(tokenURI)
                    const fee = await ethers.utils.formatUnits(i.fee.toString(), 'ether')
            
                    // console.log(i)
            
                    let items = {
            
                      apptId: i.apptId.toString(),
                      epochTime: i.epochTime.toString(),
                      appointmentType: i.appointmentType.toString(),
                      fee: fee,
                    
                      nftTokenId: i.nftTokenId.toString(),
                      tokenURI
                      
                    }
                    return items
                    
                }
            
                ))
            
                setTokens(appts)
                setLoadingState(!loadingState)}  catch(e) {

                    console.log(e)
                }
               
            
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
            loadingState, setLoadingState, loadNfts,buyNft}}>
                {children}
            </ChainContext.Provider>
        )

}