import React from 'react'
import{ create as ipfsClient } from 'ipfs-http-client'
import Web3modal from 'web3modal'
import { ethers } from "ethers";
import HealthMarket from '../artifacts/contracts/MentalHealthMarket.sol/MentalHealthMarket.json'
import ApptToken from '../artifacts/contracts/Token.sol/ElDigitalAsset.json'

import { useHistory } from "react-router-dom";

const IPFS_BASE_URL = 'https://ipfs.infura.io:5001/api/v0'


client = ipfsClient(IPFS_BASE_URL)

import {nftTokenSmartContractAddress,nftMarketSmartContractAddress } from '../../utility/config'

export default function CreateComponent() {
   
    const [nftURI, setNftURI] = React.useState()

    const [formInput, setInput] = React.useState({
        address: "",
        date: "",
        email: "",
        fee: "",
        appointmentType: ""
      })

      const  getFile = async (e) => {

      const file = e.target.files[0]
      try {
            const added = await client.add(file, {
                progress: (prog) => {console.log(`Received - ${prog}`)}
            })

            const uri = `https://ipfs.infura.io/ipfs/${added.path}`

            setNftURI(uri)
      

      } 
      catch(e) { console.log(e) }
      }

      const createSale = async () => {
        const web3modal = new Web3modal()
        const c = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(c)
        const signer = provider.getSigner()

        let contract = new ethers.Contract(nftTokenSmartContractAddress,ApptToken.abi,signer)
        const transaction  = await contract.createToken(nftURI)
        const tx = await transaction.wait()
        console.log(tx)
        const event = tx.events[0]
        const value = tx.events[2]
        let tokenId = value.toNumber()

        const price = ethers.utils.parseUnits('.01', 'ether')

        let contract = new ethers.Contract(nftMarketSmartContractAddress,HealthMarket.abi,signer) 
        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()
        transaction = await contract.createMarketItem(nftMarketSmartContractAddress, 1, 888888, 3, listingPrice, 
            {value: listingPrice})
        await transaction.wait()
        useHistory.push('/')        


      }

     


      }


    //   address nftContract,
    //   uint256 nftTokenId,
    //   uint256 epochTime, 
    //   uint256  appointmentType, 
    //   uint fee


     
    return (
        <div>
            
        </div>
    )
}
