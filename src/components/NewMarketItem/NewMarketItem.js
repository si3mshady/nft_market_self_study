
import React from 'react'
import './NewMarketItem.css'
import JsFileDownloader from 'js-file-downloader';


import{ create as ipfsClient } from 'ipfs-http-client'
import Web3modal from 'web3modal'
import { ethers } from "ethers";
import HealthMarket from '../../artifacts/contracts/MentalHealthMarket.sol/MentalHealthMarket.json'
import ApptToken from '../../artifacts/contracts/Token.sol/ElDigitalAsset.json'
import {ChainContext} from '../../context/ChainContext'



import {nftTokenSmartContractAddress,nftMarketSmartContractAddress } from '../../utility/config'

import { useNavigate } from "react-router-dom";



const IPFS_BASE_URL = 'https://ipfs.infura.io:5001/api/v0'


const client = ipfsClient(IPFS_BASE_URL)


export default function NewMarketItem() {

  const {loadNfts} = React.useContext(ChainContext)


  const navigate = useNavigate()


  const  getFile = async (e) => {

    const file = await e.target.files[0]
    try {
          const added = await client.add(file, {
              progress: (prog) => {console.log(`Received - ${prog}`)}
          })

          const uri = `https://ipfs.infura.io/ipfs/${added.path}`

          console.log(uri)

          setNftURI(uri)
    

    } 
    catch(e) { console.log(e) }
    }



    const createSale = async (url) => {
      // const web3modal = new Web3modal()
      // const c = await web3modal.connect()
      if (!window.ethereum) {
        alert('Please install metamask')
      } 
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner()

      var contract = new ethers.Contract(nftTokenSmartContractAddress,ApptToken.abi,signer)

      let transaction  = await contract.createToken(url)
      
      const tx = await transaction.wait()
      console.log('This is the tx data',tx)
      const event = tx.events[0]
      const value = tx.events[2]

      console.log('value',value)
      // let tokenId = value.toNumber()


      const price = ethers.utils.parseUnits('.021', 'ether')


      var contract = new ethers.Contract(nftMarketSmartContractAddress,HealthMarket.abi,signer) 
      let listingPrice = await contract.getListingPrice()
      listingPrice = listingPrice.toString()


      transaction = await contract.createNewListing(nftTokenSmartContractAddress, 1, 
        formData.date, formData.appointmentType, price, 
          {value: listingPrice})


      await transaction.wait()

      await loadNfts() 

    }



  const [nftURI, setNftURI] = React.useState()

 

  

    const [formData, setFormData] = React.useState({
        address: "",
        date: "",
        appointmentType: "",
        fee: ""
       
      })

    const [uri, setEncodedUri] = React.useState('')

     const [loading, setLoadingState] = React.useState(false)

     const [download, setReadyToDownload] = React.useState(false)


    const handleDownload = (e) => {
      new JsFileDownloader({ 
        url: uri,
        filename: `nft-token-${Date.now()}.png`
      })
      .then(function () {
        console.log('Success')  
        
        setReadyToDownload(!download)

        // setLoadingState(!loading)
        // Called when download ended
      })
      .catch(function (error) {
        // Called when an error occurred
        console.log(error)
      });
    }

    const createItem =  async (uri) => {
      const data = JSON.stringify({
        nftUri:nftURI } )

      try {

        const added = await client.add(data)
        const uri = `https://ipfs.infura.io/ipfs/${added.path}`

        console.log(uri)
        createSale(uri)

      } catch(e) {

        console.log(e)


      }
    }


      const handleSubmit = (e) => {
        e.preventDefault()
        setLoadingState(!loading)
        stringify_to_base64()
        
       
      }
      
      const handleChange = (e) => {
        e.preventDefault()
        setFormData({...formData, [e.target.name]: e.target.value})
        
      
      }

      const encodeURI = (base64String) => {

        const uri =  `https://api.qrserver.com/v1/create-qr-code/?data=${base64String}`
        
        console.log(uri)
        setEncodedUri(uri)
        
      }


      const stringify_to_base64  = async () => {
        const stringified_json = JSON.stringify(formData)
        const converted_base64 = btoa(stringified_json) 
       
        encodeURI(converted_base64)
      

      }

     
    return (

      <>

        {!loading ?
         (<form  onSubmit={handleSubmit}>
            <h1>For Providers: </h1> 
            <h2> Please create a new appointment token</h2>
            <input placeholder='Doctor Wallet Address'  name='address' type='text' onChange={handleChange} />
            <input placeholder='Set Appointment Date (Epoch)'  name='date' type='text' onChange={handleChange} />
            <input placeholder='Appointment Type (1-5)' name='appointmentType' type='text' onChange={handleChange} />
           
            <input placeholder='Doctor consultation fee' name='fee' type='text' onChange={handleChange}/>         
            <input type='submit'/>
        </form>): 
        
        (
          <div className='container_qrc'>
            
          <img className='qrcCode' src={uri} alt='' title='' />
          <a onClick={handleDownload} className='submitButton' > Download  </a> 
          <input type='file' className='submitButton' onClick={getFile} />
          <a  onClick={createItem} className='submitButton'>Create Market Item</a>
          
          </div>
                   
        )
     

        
}
      </>
        
    )
}
