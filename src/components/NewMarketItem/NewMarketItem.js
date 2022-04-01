
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

      const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
       
      }
      
      const handleChange = (e) => {
        e.preventDefault()
        setFormData({...formData, [e.target.name]: e.target.value})
        console.log(`This is the new value of ${formData.address}`)
      
      }

    return (+
    
          <form  onSubmit={handleSubmit}>
            <h1>For Providers: Please create a new appointment token</h1>
            <input placeholder='Doctor Wallet Address'  name='address' type='text' onChange={handleChange} />
            <input placeholder='Set Appointment Date'  name='date' type='text' onChange={handleChange} />
            <input placeholder='Appointment Type' name='appointmentType' type='text' onChange={handleChange} />
            <input placeholder='Doctor Email' name='email' type='text' onChange={handleChange} />
            <input placeholder='Doctor consultation fee' name='fee' type='text' onChange={handleChange}/>         
            <input type='submit'/>
        </form>
        </div>
    )
}
