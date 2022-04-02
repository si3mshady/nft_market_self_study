
import React from 'react'
import './NewMarketItem.css'
import JsFileDownloader from 'js-file-downloader';
// import axios from 'axios'
export default function NewMarketItem() {

  // React.useEffect(() => {
  //   console.log('Use effect')
  //   // handleDownload()
  //  },[loading])

    const [formData, setFormData] = React.useState({
        address: "",
        date: "",
        email: "",
        fee: "",
        appointmentType: ""
      })

    const [uri, setEncodedUri] = React.useState('')

     const [loading, setLoadingState] = React.useState(false)


    const handleDownload = () => {
      new JsFileDownloader({ 
        url: uri
      })
      .then(function () {
        console.log('Success')  
        setLoadingState(!loading)
        // Called when download ended
      })
      .catch(function (error) {
        // Called when an error occurred
        console.log(error)
      });
    }
      const handleSubmit = (e) => {
        e.preventDefault()
        setLoadingState(!loading)
        stringify_to_base64()
        // handleDownload()
       
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
        // console.log(converted_base64)
        encodeURI(converted_base64)
        // await handleDownload()

      }

     
    return (

      <>

        {!loading ?
         (<form  onSubmit={handleSubmit}>
            <h1>For Providers: Please create a new appointment token</h1>
            <input placeholder='Doctor Wallet Address'  name='address' type='text' onChange={handleChange} />
            <input placeholder='Set Appointment Date'  name='date' type='text' onChange={handleChange} />
            <input placeholder='Appointment Type' name='appointmentType' type='text' onChange={handleChange} />
            <input placeholder='Doctor Email' name='email' type='text' onChange={handleChange} />
            <input placeholder='Doctor consultation fee' name='fee' type='text' onChange={handleChange}/>         
            <input type='submit'/>
        </form>): 
        
        (
          <div className='container_qrc'>
            
          <img className='qrcCode' src={uri} alt='' title='' />
          <button onClick={handleDownload} className='submitButton' > Submit </button> 
          </div>
                   
        )
     

        
}
      </>
        
    )
}
