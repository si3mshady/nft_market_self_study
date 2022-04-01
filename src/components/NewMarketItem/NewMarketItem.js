
import React from 'react'
import './NewMarketItem.css'


const handleSubmit = () => {

}

const handleChange = (e) => {
    e.preventDefault()
  
  }

export default function NewMarketItem() {


    const [formData, setFormData] = React.useState({
        address: "",
        date: "",
        email: "",
        fee: "",
        appointmentType: ""
      })
      
    return (
        <div class="container">
       
            <form >
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
