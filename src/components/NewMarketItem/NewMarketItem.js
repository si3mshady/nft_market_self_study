
import React from 'react'
import './NewMarketItem.css'


export default function NewMarketItem() {

    const [formData, setFormData] = React.useState({
        address: "",
        date: "",
        email: "",
        fee: "",
        appointmentType: ""
      })

    const [uri, setEncodedUri] = React.useState('')

     const [loading, setLoadingState] = React.useState(false)

      const handleSubmit = (e) => {
        e.preventDefault()
        setLoadingState(!loading)
        stringify_to_base64()
       
      }
      
      const handleChange = (e) => {
        e.preventDefault()
        setFormData({...formData, [e.target.name]: e.target.value})
        
      
      }

      const encodeURI = () => {

        const uri =  `https://api.qrserver.com/v1/create-qr-code/?data=${stringify_to_base64()}`
        
        // const uri = encodeURI(uri)
        console.log(uri)
        setEncodedUri(uri)
        
      }


      const stringify_to_base64  = () => {
        const stringified_json = JSON.stringify(formData)
        const converted_base64 = btoa(stringified_json)
        console.log(converted_base64)
        encodeURI()
        // return converted_base64

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
            
          <img src={uri} alt='' title='' />
          <button onClick={()=> {setLoadingState(!loading)}} className='submitButton' type='submit'> Submit </button> 
          </div>
                   
        )
     
     
        
        
}
      </>
        
    )
}
